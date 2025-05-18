import {prisma} from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


function containsMaliciousContent(input: string): boolean {
    const lower = input.toLowerCase();
    return (
        lower.includes("<script") ||
        lower.includes("</script>") ||
        /<.*?>/.test(lower) // tag HTML umum
    );
}

// Fungsi sanitasi ringan (optional: trimming dan stripping karakter aneh)
function sanitizeInput(input: string): string {
    return input.replace(/[\x00-\x1F\x7F]/g, "").trim();
}

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

        if(!name || !quantity || quantity < 0 || typeof name !== "string" || typeof quantity !== "number"){
            return NextResponse.json(
                {error : "Nama Barang Wajib diisi dan Jumlah Harus Angka Positif"},
                {status : 400}
            )
        }

        const sanitizedName = sanitizeInput(name);

        if(containsMaliciousContent(sanitizedName)){
            return NextResponse.json(
                {error : "Nama mengandung karakter tidak valid"},
                {status : 400}
            );
        };

        const newItem = await prisma.item.create({
            data : {
                name : sanitizedName,
                quantity,
            },
        })

        return NextResponse.json(newItem, {status : 201});
    } catch (error){
        console.error(error);
        return NextResponse.json({error : "Gagal mencatat barang"}, {status : 500})
    }
}