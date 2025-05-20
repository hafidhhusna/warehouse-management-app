# Warehouse Management Web Software Testing

## 📦 Repository Contents

Repositori ini berisi hasil pekerjaan tim dalam menyelesaikan tugas proyek software testing untuk user story Sistem Pergudangan (STR02)

### User Story
Sebuah gudang membutuhkan sistem digital untuk mencatat barang masuk guna memudahkan pelacakan stok dan mencegah kesalahan pencatatan manual, sehingga petugas gudang dapat mengisi formulir dengan nama barang dan jumlah, lalu melihat daftar barang masuk terbaru untuk memastikan inventaris selalu diperbarui. Fitur ini mengharuskan halaman utama menampilkan formulir dengan kolom untuk nama barang (wajib, maksimum 100 karakter) dan jumlah (wajib, angka positif), di mana setelah mengklik "Catat Barang", data disimpan dan daftar barang masuk diperbarui dengan nama barang, jumlah, dan tanggal pencatatan (menampilkan hingga 10 entri terbaru tanpa perlu refresh); jika nama barang kosong atau jumlah bukan angka positif, pengguna akan melihat pesan error seperti "Nama barang wajib diisi" atau "Jumlah harus angka positif", dan data barang masuk tetap tersimpan di backend setelah halaman di-refresh.


### ✅ Fitur dan Acceptance Criteria

### Fitur 


| **No** | **Fitur**                       | **Deskripsi**                                                                                           | **Antarmuka Pengguna**                                                                                                    |
|--------|----------------------------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| 1      | Input Barang                    | Menambahkan barang baru ke sistem dengan memasukkan **Nama Barang** dan **Jumlah**.                      | Form input untuk nama barang dan jumlah barang, dengan tombol **Catat Barang** untuk menyimpan data.                       |
| 2      | Tabel Daftar Barang             | Menampilkan semua barang yang sudah tercatat dalam database.                                             | Tabel yang menampilkan **No**, **Nama Barang**, **Jumlah**, dan **Tanggal**. Tabel harus menampilkan 10 terbaru tanpa perlu melakukan refresh. |
| 3      | Validasi Input dan Error Handling| Validasi input barang untuk memastikan **Nama Barang** tidak kosong dan **Jumlah** adalah angka positif. | Menampilkan pesan error yang sesuai ketika input tidak valid atau terjadi kesalahan sistem.                               |
| 4      | Perpindahan Page                | Beranda akan menampilkan 10 input data terbaru, untuk menampilkan data yang lebih lama perlu melakukan perpindahan page dengan menekan tombol **Previous** atau **Next**. | Button **Next** dan **Previous** yang akan mengarahkan pengguna ke halaman setelah dan sebelumnya. |


### Acceptance Criteria


| **No** | **Fitur**                      | **Acceptable Criteria**                                                                                              | **Status** |
|--------|---------------------------------|------------------------------------------------------------------------------------------------------------------------|------------|
| 1      | Input Barang                    | Pengguna dapat memasukkan **Nama Barang** dan **Jumlah** barang.                                                      | Pass       |
|        |                                 | **Nama Barang** tidak boleh kosong dan maksimal 100 karakter.                                                          | Pass       |
|        |                                 | **Jumlah** harus berupa angka positif.                                                                                 | Pass       |
|        |                                 | Setelah menekan tombol **Catat Barang**, data disimpan dan ditampilkan di daftar barang.                               | Pass       |
| 2      | Tabel Daftar Barang             | Daftar barang yang baru tercatat muncul di tabel tanpa perlu me-refresh halaman.                                       | Pass       |
|        |                                 | Tabel menampilkan **No**, **Nama Barang**, **Jumlah**, dan **Tanggal**.                                                 | Pass       |
|        |                                 | Daftar barang yang muncul di tabel harus sesuai dengan urutan terbaru, menampilkan hingga 10 entri.                  | Pass       |
| 3      | Validasi Input dan Error Handling| **Nama Barang** tidak boleh kosong.                                                                                     | Pass       |
|        |                                 | **Jumlah** harus berupa angka positif.                                                                                  | Pass       |
|        |                                 | Setelah error terjadi, data tidak disimpan di backend, muncul pesan error yang sesuai, dan pengguna diminta untuk memperbaiki input. | Pass       |
| 4      | Perpindahan Page                | Sistem berhasil melakukan perpindahan antar page baik pada page **previous** maupun **next**.                          | Pass       |



### 👥 Pembagian Role dan Deskripsi Tugas
| Nama Mahasiswa                                 | Role                       | Deskripsi Tugas                                                        |
|------------------------------------------------|----------------------------|------------------------------------------------------------------------|
| Emir Abe Putra A - 22/499337/TK/54742          | Frontend Dev               | Implementasi UI, integrasi API, dan unit testing frontend              |
| Hafidh H - 22/498640/TK/54706                  | Backend Dev                | Pembuatan API dan unit testing backend                                 |
| Aisa Selvira Q.A - 22/498561/TK/54690          | QA                         | Penulisan test case dan coverage analysis, user acceptance testing     |

### 📸 Hasil Pengujian

#### 🔹 Screenshot Hasil API Test
![Hasil API Testing](docs/api-tests-result/api-test-result.png)

#### 🔹 Screenshot Coverage Unit Test
![Hasil Frontend Testing](https://github.com/user-attachments/assets/7594b9ea-5408-4f79-b733-c487bf7eedc1)


### 🖥️ Slide Presentasi
Tautan ke slide: [Google Slides](https://docs.google.com/presentation/d/1F75Uo4i4qnRPbH0czGJfPy5RJsXQPQFx/edit?usp=sharing&ouid=111007761289601157187&rtpof=true&sd=true)

