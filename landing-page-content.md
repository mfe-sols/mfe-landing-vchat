# VChat Landing Page — Nội dung hoàn chỉnh

> Ngôn ngữ mặc định: **Tiếng Việt**
> URL: [vopenworld.com](https://vopenworld.com)
> Source: `apps/mfe-landing-vchat/`

---

## Mục lục

1. [Hero](#1-hero)
2. [Tổng quan sản phẩm](#2-tổng-quan-sản-phẩm)
3. [Module cốt lõi (9)](#3-module-cốt-lõi)
4. [Kiến trúc nổi bật](#4-kiến-trúc-nổi-bật)
5. [Bảo mật](#5-bảo-mật)
6. [Mô hình triển khai](#6-mô-hình-triển-khai)
7. [Lợi thế cạnh tranh](#7-lợi-thế-cạnh-tranh)
8. [Phù hợp với](#8-phù-hợp-với)
9. [Đa nền tảng](#9-đa-nền-tảng)
10. [Tuân thủ Việt Nam](#10-tuân-thủ-việt-nam)
11. [Mô tả ngắn (One-liners)](#11-mô-tả-ngắn)
12. [Footer](#12-footer)

---

## 1. Hero

**Eyebrow:** Nền tảng quản lý doanh nghiệp toàn diện

**Tiêu đề:** Một ứng dụng. Mọi phòng ban. Không cần cloud.

**Mô tả:** VChat là nền tảng quản lý doanh nghiệp tự chủ, chạy hoàn toàn trên mạng nội bộ — POS, kế toán, nhân sự, kho hàng, chat nhóm và quản lý rủi ro trong một ứng dụng desktop gốc duy nhất với phí thuê bao bằng không.

**CTA:**
- "Khám phá tính năng" → cuộn đến #modules
- "Xem kiến trúc" → cuộn đến #architecture

**Chỉ số nổi bật:**

| Giá trị | Nhãn |
|---------|------|
| 9 | Module tích hợp |
| 257 | Đối tượng quản lý |
| Zero | Đám mây |

**Visual:** HeroCanvas — hệ thống hạt 3D (Three.js) kết nối particle network.

---

## 2. Tổng quan sản phẩm

**Tiêu đề:** Tổng quan sản phẩm

**Nội dung:** VChat đóng gói toàn bộ hệ thống doanh nghiệp vào một ứng dụng duy nhất — không cần thuê máy chủ, không phí hàng tháng, không cần internet. Mọi tính năng chạy trực tiếp trên máy tính của bạn, đồng bộ giữa các thiết bị qua mạng nội bộ với mã hóa cấp quân sự.

**Đối tượng:** Được xây dựng cho SME Việt Nam, nhà hàng, chuỗi bán lẻ, và mọi doanh nghiệp coi trọng chủ quyền dữ liệu.

**Visual:** Floating gradient orbs + parallax effect khi scroll.

---

## 3. Module cốt lõi

**Eyebrow:** Tất cả trong một nền tảng
**Tiêu đề:** Sẵn sàng vận hành ngay

### 3.1 🛍️ Bán hàng & Thu ngân (POS)

**Mô tả:** Từ quán cà phê đến chuỗi bán lẻ — một màn hình xong giao dịch.

| # | Tính năng |
|---|-----------|
| 1 | Danh mục sản phẩm với phân loại, mã SKU và hình ảnh |
| 2 | Đa phương thức thanh toán (tiền mặt, thẻ, chuyển khoản, ví điện tử) |
| 3 | Mở/đóng ca với đối chiếu tiền mặt |
| 4 | Hệ thống khuyến mãi thông minh (%, cố định, mua X tặng Y) |
| 5 | Xử lý trả hàng và hoàn tiền |
| 6 | Chương trình tích điểm khách hàng |
| 7 | Xuất hóa đơn thuế (tuân thủ VAT) |
| 8 | Chốt ca ngày & tháng với tự động đối chiếu |
| 9 | Dashboard bán hàng thời gian thực & 6 báo cáo phân tích |
| 10 | Tích hợp thanh toán QR (VietQR-ready) |
| 11 | Quản lý đa chi nhánh từ một giao diện |

### 3.2 📊 Kế toán & Tài chính

**Mô tả:** Sổ sách chuẩn Việt Nam, sẵn xuất báo cáo thuế ngay.

| # | Tính năng |
|---|-----------|
| 1 | Hệ thống tài khoản chuẩn TT99 / TT200 / TT133 |
| 2 | Bút toán nhật ký đa dòng |
| 3 | Kỳ kế toán và khóa sổ cuối năm |
| 4 | Bảng cân đối phát sinh, Bảng CĐKT, KQKD, Lưu chuyển tiền tệ |
| 5 | Sổ cái với theo dõi đối tác chi tiết |
| 6 | Quản lý chứng từ |
| 7 | Quản lý hóa đơn với mẫu tùy chỉnh |
| 8 | Sổ hóa đơn VAT và theo dõi chứng từ thuế |
| 9 | Quản lý tỷ giá (đa tiền tệ) |
| 10 | Tích hợp giao dịch tồn kho |
| 11 | Xuất CSV/Excel cho tất cả báo cáo |
| 12 | Theo dõi số dư đối tác |
| 13 | Sẵn sàng quyết toán thuế cuối năm |

### 3.3 👥 Nhân sự & Chấm công

**Mô tả:** Từ tuyển dụng đến trả lương — tất cả tự động.

| # | Tính năng |
|---|-----------|
| 1 | Cơ cấu tổ chức: Phòng ban + Vai trò (phân quyền) |
| 2 | Hồ sơ nhân viên với theo dõi vòng đời |
| 3 | Quản lý nghỉ phép: loại, số dư, quy trình duyệt |
| 4 | Chấm công: check-in/out, xử lý hàng loạt, báo cáo |
| 5 | Đánh giá hiệu suất |
| 6 | Lương: tự động tạo từ chấm công, tính toán chi tiết |
| 7 | Theo dõi công việc với lịch sử và chỉ số |
| 8 | Quản lý tỷ lệ bảo hiểm |
| 9 | Báo cáo nhân sự tổng hợp theo tháng |

### 3.4 📦 Kho hàng & Cung ứng

**Mô tả:** Biết chính xác tồn kho mọi lúc, cảnh báo trước khi hết hàng.

| # | Tính năng |
|---|-----------|
| 1 | Dữ liệu nguyên vật liệu với phân loại |
| 2 | Quản lý nhà cung cấp |
| 3 | Hỗ trợ đa kho |
| 4 | Đơn mua hàng với chi tiết và trạng thái duyệt |
| 5 | Nhập kho liên kết PO |
| 6 | Xuất kho |
| 7 | Điều chỉnh tồn kho với lý do |
| 8 | Tồn kho thời gian thực và cảnh báo hàng sắp hết |
| 9 | Dashboard kho hàng |
| 10 | Nhật ký kiểm toán cho mọi biến động |
| 11 | Theo dõi hạn sử dụng và lô hàng |

### 3.5 💬 Nhắn tin & Cộng tác

**Mô tả:** Chat nội bộ bảo mật, thay thế Zalo/Slack cho doanh nghiệp.

| # | Tính năng |
|---|-----------|
| 1 | Kênh (công khai/riêng tư) với quản lý thành viên |
| 2 | Nhắn tin tức thì, không độ trễ |
| 3 | Chỉnh sửa và xóa tin nhắn |
| 4 | React bằng emoji |
| 5 | Đính kèm file (tối đa 5 MB) |
| 6 | Hiển thị đang gõ |
| 7 | Trạng thái online/offline |
| 8 | Gọi thoại/video trực tiếp trong ứng dụng |
| 9 | Hỗ trợ đa phiên (cùng user, nhiều thiết bị) |
| 10 | Lịch sử trò chuyện được lưu trữ an toàn |

### 3.6 🛡️ Quản lý rủi ro

**Mô tả:** Phát hiện sớm, cảnh báo ngay — bảo vệ doanh nghiệp chủ động.

| # | Tính năng |
|---|-----------|
| 1 | Hệ thống quy tắc rủi ro có thể cấu hình |
| 2 | Theo dõi sự kiện rủi ro thời gian thực |
| 3 | Chấm điểm rủi ro theo danh mục |
| 4 | Báo cáo rủi ro tổng hợp theo kỳ |

### 3.7 ⚙️ Quản trị hệ thống

**Mô tả:** Cấu hình, giám sát và kiểm soát toàn bộ từ một nơi.

| # | Tính năng |
|---|-----------|
| 1 | Ghép nối thiết bị VKiosk cho gọi món tablet |
| 2 | Giám sát tình trạng lưu trữ |
| 3 | Khả năng reset hệ thống |
| 4 | Tạo dữ liệu demo |

### 3.8 📱 Gọi món Tablet (VKiosk)

**Mô tả:** Khách tự gọi món trên tablet — giảm nhân sự, tăng tốc phục vụ.

| # | Tính năng |
|---|-----------|
| 1 | Ghép nối tablet với POS qua mạng nội bộ |
| 2 | Hiển thị thực đơn với hình ảnh và giá |
| 3 | Khách chọn món, gửi đơn về quầy thu ngân |
| 4 | Hỗ trợ nhiều tablet cùng lúc |
| 5 | Hoạt động không cần internet |

### 3.9 💳 Thanh toán & Thu chi

**Mô tả:** Mọi hình thức thanh toán từ tiền mặt đến QR — đối chiếu tự động.

| # | Tính năng |
|---|-----------|
| 1 | Tiền mặt, thẻ, chuyển khoản, ví điện tử |
| 2 | Thanh toán QR tích hợp VietQR |
| 3 | Đối chiếu cuối ca tự động |
| 4 | Lịch sử giao dịch chi tiết theo ngày/tuần/tháng |
| 5 | Báo cáo doanh thu và công nợ thời gian thực |

---

## 4. Kiến trúc nổi bật

**Eyebrow:** Kiến trúc hệ thống
**Tiêu đề:** Kiến trúc nổi bật

**Visual:** ArchCanvas — 3D device topology (Three.js) hiển thị thiết bị kết nối LAN.

### 4.1 Không đám mây, ưu tiên LAN

**Mô tả:** Mỗi thiết bị là một ứng dụng đầy đủ. Không máy chủ trung tâm.

| # | Chi tiết |
|---|----------|
| 1 | Không máy chủ trung tâm — mỗi thiết bị là hệ thống đầy đủ |
| 2 | Tự động phát hiện thiết bị cùng mạng — không cần cấu hình |
| 3 | Xác thực thiết bị an toàn, chống giả mạo |
| 4 | Hoạt động ổn định kể cả khi WiFi không ổn định |
| 5 | Tự phục hồi khi mất kết nối — không cần người can thiệp |
| 6 | Sao lưu tự động mỗi 5 phút, khôi phục chỉ trong 15 phút |

### 4.2 Một file duy nhất, đầy đủ chức năng

**Mô tả:** Một file duy nhất chứa toàn bộ hệ thống — máy chủ, giao diện, cơ sở dữ liệu.

| # | Chi tiết |
|---|----------|
| 1 | Hiệu suất cao, xử lý hàng nghìn giao dịch mỗi giây |
| 2 | Giao diện mượt mà, hiện đại, dễ sử dụng |
| 3 | Cơ sở dữ liệu nhúng sẵn — không cần cài đặt riêng |
| 4 | Tích hợp sâu với hệ điều hành: thông báo, khay hệ thống |
| 5 | Cài đặt: một file .app hoặc .exe duy nhất |

---

## 5. Bảo mật

**Eyebrow:** Phòng thủ nhiều lớp
**Tiêu đề:** Bảo mật

**Visual:** Ambient glow pulse + parallax background khi scroll.

### 5.1 Bảo mật mạng (4 lớp)

| # | Chi tiết |
|---|----------|
| 1 | Mã hóa dữ liệu truyền tải — tự động, không cần cấu hình |
| 2 | Chỉ cho phép truy cập trong mạng nội bộ |
| 3 | Luôn bật bảo mật truyền tải dữ liệu |
| 4 | Kiểm soát truy cập chặt chẽ giữa các ứng dụng |

### 5.2 Bảo mật ứng dụng (6 lớp)

| # | Chi tiết |
|---|----------|
| 1 | Mật khẩu được mã hóa an toàn, không bao giờ lưu dạng rõ |
| 2 | Đăng nhập an toàn, phiên được bảo vệ tự động |
| 3 | Chống brute-force: 10 lần sai → khóa 15 phút |
| 4 | Chống tấn công tự động — giới hạn truy cập bất thường |
| 5 | Ngăn chặn dữ liệu độc hại gửi vào hệ thống |
| 6 | Mã hóa toàn bộ dữ liệu khi tắt ứng dụng |

### 5.3 Gia cố HTTP (7 lớp)

| # | Chi tiết |
|---|----------|
| 1 | Chặn mã độc chạy trên giao diện |
| 2 | Ngăn giả mạo loại tệp tin |
| 3 | Chống nhúng trang web trong khung giả mạo |
| 4 | Kiểm soát thông tin gửi đến bên thứ ba |
| 5 | Camera và mic chỉ hoạt động khi được phép |
| 6 | Mỗi yêu cầu có mã định danh để theo dõi |
| 7 | Không bao giờ lộ thông tin hệ thống khi có lỗi |

---

## 6. Mô hình triển khai

**Eyebrow:** So sánh mô hình
**Tiêu đề:** Mô hình triển khai

**Visual:** Box-shadow glow + accent stripe dọc cột VChat.

| Tiêu chí | SaaS truyền thống | VChat |
|----------|-------------------|-------|
| Máy chủ | ☁️ Máy chủ đám mây | 🏢 Mạng LAN văn phòng |
| Chi phí | 💰 Thuê bao hàng tháng | 💰 Mua một lần |
| Kết nối mạng | 🌐 Bắt buộc | 📡 Hoạt động ngoại tuyến |
| Dữ liệu | 🔓 Trên server nhà cung cấp | 🔒 Trên máy của bạn |
| Thời gian hoạt động | ⚡ Nhà cung cấp kiểm soát | ⚡ Bạn kiểm soát mọi thứ |
| Xuất dữ liệu | 📊 Giới hạn | 📊 Toàn quyền sở hữu |

**Tagline:** Không phí định kỳ · Không phụ thuộc internet · Toàn quyền dữ liệu

---

## 7. Lợi thế cạnh tranh

**Tiêu đề:** Lợi thế cạnh tranh

| Tính năng | VChat | POS đám mây | ERP doanh nghiệp |
|-----------|-------|-------------|-------------------|
| Cần Internet | ❌ Không | ✅ Có | ✅ Có |
| Phí hàng tháng | ❌ Không | $30–200/tháng | $500+/tháng |
| Vị trí dữ liệu | Tại chỗ | Nhà cung cấp đám mây | Đám mây/kết hợp |
| Đa module | 9 tích hợp | 1–2 tập trung | Nhiều (phức tạp) |
| Thời gian cài đặt | Phút | Giờ | Tuần–Tháng |
| Đồng bộ đa thiết bị | LAN P2P | Đồng bộ đám mây | Đồng bộ đám mây |
| Hoạt động ngoại tuyến | ✅ Đầy đủ | ❌ Hạn chế | ❌ Hạn chế |
| Chuẩn VN | ✅ TT99/200/133 | Một phần | Tùy |
| Chat tích hợp | ✅ Có | ❌ Không | ❌ Công cụ riêng |
| Gọi thoại/video | ✅ WebRTC | ❌ Không | ❌ Không |

---

## 8. Phù hợp với

**Eyebrow:** Khách hàng mục tiêu
**Tiêu đề:** Phù hợp với

| Icon | Phân khúc | Mô tả |
|------|-----------|-------|
| 🏪 | Cửa hàng bán lẻ | POS, kho hàng, tích điểm khách hàng |
| 🍜 | Nhà hàng & F&B | Thu ngân, gọi món tablet (VKiosk) |
| 🏭 | Sản xuất nhỏ | Kho hàng, đơn mua, nhập/xuất kho |
| 🏢 | Văn phòng SME | Kế toán, nhân sự, lương, chat nội bộ |
| 🏥 | Phòng khám & Dịch vụ | Quy trình đặt lịch, phối hợp nhóm |
| 🌾 | Doanh nghiệp nông thôn | Hoạt động không internet, chỉ LAN |

---

## 9. Đa nền tảng

**Tiêu đề:** Đa nền tảng

| Nền tảng | Định dạng | Kiến trúc |
|----------|-----------|-----------|
| macOS | Gói .app · Trình cài đặt .pkg | Apple Silicon (arm64) |
| macOS Notarization | Chứng thực Apple | ✅ Hỗ trợ |
| Windows | .exe di động | x64 · ARM64 |
| Linux | File nhị phân (không giao diện) | x64 |
| Di động/Máy tính bảng | PWA (ứng dụng web cài được) | Mọi trình duyệt |

---

## 10. Tuân thủ Việt Nam

**Eyebrow:** Tuân thủ quy định
**Tiêu đề:** Tuân thủ Việt Nam

1. Chuẩn kế toán: TT99, TT200, TT133
2. Sổ hóa đơn VAT và quản lý chứng từ thuế
3. Tích hợp thanh toán VietQR
4. Tiếng Việt là ngôn ngữ UI chính
5. Tiền VND với độ chính xác tới đơn vị đồng

---

## 11. Mô tả ngắn

| Loại | Nội dung |
|------|----------|
| Khẩu hiệu | Toàn bộ doanh nghiệp trong một ứng dụng. Không đám mây. Không thuê bao. Không thỏa hiệp. |
| Tối ưu tìm kiếm (SEO) | VChat — Quản lý doanh nghiệp ưu tiên ngoại tuyến: POS, kế toán, nhân sự, kho hàng và chat nhóm cho SME Việt Nam. |
| Mạng xã hội | 9 module · 256 tính năng · Không cần internet. Giới thiệu VChat. |
| Kỹ thuật | Hơn 327.000 dòng nghiệp vụ. Một file duy nhất. Không phụ thuộc bên thứ ba. Đồng bộ nội bộ tức thì. Mã hóa toàn bộ dữ liệu. |

---

## 12. Footer

**Tagline:** VChat — Toàn bộ doanh nghiệp trong một ứng dụng.

---

## Phụ lục A: Visual Effects & Animations

| Section | Effect |
|---------|--------|
| Hero | 3D particle network (Three.js HeroCanvas), parallax glow layer, cascade entrance timeline |
| Overview | Floating gradient orbs, parallax via `--lv-parallax-y` CSS variable |
| Modules | Glassmorphism cards (`backdrop-filter: blur(12px)`), icon gradient badges với hover glow halo, stagger entrance |
| Architecture | 3D device topology (Three.js ArchCanvas), glassmorphism cards, stagger entrance |
| Security | Ambient glow pulse, parallax background, glassmorphism cards, stagger entrance |
| Deploy | Box-shadow glow, VChat column accent stripe, alternating row slide-in |
| Competitive | Table row stagger slide |
| Ideal For | Icon glow + radial orb, scale-bounce icon entrance |
| Compliance | Checkmark green circle badges, sequential entrance |
| One-liners | Slide-in từ trái |
| Connector lines | Scrub-linked scaleY draw animation |

**A11y:** Tất cả animation tôn trọng `prefers-reduced-motion: reduce` — tắt hoàn toàn khi user chọn reduced motion.

---

## Phụ lục B: Cấu trúc section trên page (thứ tự render)

```
┌─────────────────────────────┐
│  HERO (header)              │  ← HeroCanvas 3D
│  └─ Stats: 9 / 257 / Zero  │
├── Connector ────────────────┤
│  OVERVIEW (#overview)       │
├── Connector ────────────────┤
│  MODULES (#modules)         │  ← 9 module cards
├── Connector ────────────────┤
│  ARCHITECTURE (#architecture)│ ← ArchCanvas 3D + 2 cards
├── Connector ────────────────┤
│  SECURITY (#security)       │  ← 3 layer cards
├─────────────────────────────┤
│  DEPLOYMENT (#deployment)   │  ← So sánh SaaS vs VChat
├─────────────────────────────┤
│  COMPETITIVE (#competitive) │  ← Bảng 3 cột
├─────────────────────────────┤
│  IDEAL FOR (#ideal)         │  ← 6 segment cards
├─────────────────────────────┤
│  PLATFORMS (#platforms)     │  ← Bảng 5 nền tảng
├─────────────────────────────┤
│  COMPLIANCE (#compliance)   │  ← 5 checklist items
├─────────────────────────────┤
│  ONE-LINERS (#one-liners)   │  ← 4 blockquotes
├─────────────────────────────┤
│  FOOTER                     │
└─────────────────────────────┘
```

---

## Phụ lục C: Thống kê nội dung

| Mục | Số lượng |
|-----|----------|
| Tổng section | 12 (hero + 10 section + footer) |
| Module | 9 |
| Tổng tính năng module | 82 |
| Architecture blocks | 2 (11 items) |
| Security layers | 3 (17 items) |
| Deploy comparison rows | 6 |
| Competitive rows | 10 |
| Ideal segments | 6 |
| Platforms | 5 |
| Compliance items | 5 |
| One-liners | 4 |
| Connector animations | 4 |
| 3D Canvas | 2 (Hero + Architecture) |
