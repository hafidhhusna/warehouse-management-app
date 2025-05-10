import {prisma} from "@/lib/prisma";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const {searchParams} = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limi") || "10", 10);

        const skip = (page-1) * limit;

        const items = await prisma.item.findMany({
            orderBy : {
                createdAt : "desc",
            },
            skip,
            take:limit,
        })

        const totalItems = await prisma.item.count();
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            items,
            totalPages,
            currentPage : page,
        })
    } catch(error){
        console.error(error);
        return NextResponse.json({error : "Gagal Memuat Data"}, {status : 500});
    }
}

export async function POST(req : NextRequest){
    try{
        const {name, quantity} = await req.json();

        if(!name || !quantity || quantity < 0){
            return NextResponse.json(
                {error : "Nama Barang Wajib diisi dan Jumlah Harus Angka Positif"},
                {status : 400}
            )
        }

        const newItem = await prisma.item.create({
            data : {
                name,
                quantity,
            },
        })

        return NextResponse.json(newItem, {status : 201});
    } catch (error){
        console.error(error);
        return NextResponse.json({error : "Gagal mencatat barang"}, {status : 500})
    }
}