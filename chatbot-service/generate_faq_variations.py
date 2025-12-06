"""
Script to generate FAQ variations for training chatbot
Tạo nhiều biến thể câu hỏi cho mỗi câu trả lời để tăng độ chính xác của model
"""

import json
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import FAQ
from dotenv import load_dotenv
import os

load_dotenv()

# Định nghĩa các biến thể câu hỏi cho từng loại câu trả lời
FAQ_VARIATIONS = {
    # Đổi trả sản phẩm
    'Có, bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng': [
        'Tôi có thể đổi trả sản phẩm không?',
        'Shop có cho đổi trả không?',
        'Đổi trả hàng được không?',
        'Có được đổi hàng không?',
        'Muốn đổi hàng thì làm sao?',
        'Có chính sách đổi trả không?',
        'Shop có nhận đổi trả không?',
        'Tôi muốn đổi sản phẩm',
        'Làm sao để đổi hàng?',
        'Quy định đổi trả như thế nào?',
        'Có thể trả lại hàng không?',
        'Trả hàng được ko?',
        'Đổi đồ thế nào?',
        'Mua xong có đổi được không?',
        'Hàng mua rồi có đổi được ko?',
    ],
    
    # Điều kiện đổi trả
    'Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng': [
        'Điều kiện đổi trả sản phẩm là gì?',
        'Đổi trả cần điều kiện gì?',
        'Đổi hàng cần gì?',
        'Yêu cầu đổi trả là gì?',
        'Đổi hàng phải như thế nào?',
        'Đổi trả có điều kiện gì không?',
        'Muốn đổi hàng thì cần những gì?',
        'Quy định về đổi trả?',
        'Đổi hàng có yêu cầu gì ko?',
        'Hàng như thế nào mới đổi được?',
        'Sản phẩm thế nào thì đổi được?',
        'Điều kiện để trả hàng?',
        'Đổi đồ phải đảm bảo gì?',
    ],
    
    # Thời gian xử lý đổi trả
    'Thời gian xử lý đổi trả thường từ 3-7 ngày làm việc': [
        'Mất bao lâu để xử lý đổi trả?',
        'Đổi hàng mất bao lâu?',
        'Bao lâu thì đổi xong?',
        'Thời gian đổi trả là bao nhiêu?',
        'Đổi hàng mất mấy ngày?',
        'Xử lý đổi trả trong bao lâu?',
        'Bao lâu shop xử lý đổi trả?',
        'Đổi đồ tốn bao nhiêu thời gian?',
        'Thời gian để đổi sản phẩm?',
        'Mấy ngày thì đổi xong?',
    ],
    
    # Phí vận chuyển đổi trả
    'Nếu sản phẩm bị lỗi từ phía shop, chúng tôi sẽ chịu toàn bộ phí vận chuyển': [
        'Ai chịu phí vận chuyển khi đổi trả?',
        'Phí ship đổi trả ai trả?',
        'Đổi hàng có mất phí ship không?',
        'Phí gửi hàng đổi trả?',
        'Ai chịu phí ship khi đổi?',
        'Đổi hàng shop có trả ship không?',
        'Phí vận chuyển đổi trả thế nào?',
        'Tôi có phải trả phí ship đổi hàng không?',
        'Chi phí đổi trả ai chịu?',
    ],
    
    # Sản phẩm sale
    'Có, sản phẩm sale vẫn được đổi trả trong vòng 30 ngày': [
        'Sản phẩm sale có được đổi trả không?',
        'Hàng sale có đổi được ko?',
        'Đồ giảm giá có đổi được không?',
        'Sale có cho đổi không?',
        'Hàng khuyến mãi đổi được không?',
        'Mua sale có trả lại được không?',
        'Đồ đang sale có đổi ko?',
    ],
    
    # Thời gian giao hàng
    'Thời gian giao hàng phụ thuộc vào địa chỉ của bạn. Nội thành Hà Nội và TP.HCM: 1-2 ngày': [
        'Thời gian giao hàng là bao lâu?',
        'Bao lâu thì nhận được hàng?',
        'Mất mấy ngày để giao hàng?',
        'Khi nào thì hàng đến?',
        'Giao hàng mất bao lâu?',
        'Bao lâu có hàng?',
        'Mấy ngày thì ship đến?',
        'Thời gian ship hàng?',
        'Bao giờ nhận được đồ?',
        'Đặt hàng bao lâu thì có?',
        'Ship mất bao nhiêu ngày?',
        'Bao lâu đơn về?',
        'Khi nào giao được?',
    ],
    
    # Phí vận chuyển
    'Phí vận chuyển dao động từ 15.000đ - 50.000đ tùy theo khu vực': [
        'Phí vận chuyển là bao nhiêu?',
        'Phí ship bao nhiêu?',
        'Giá ship là gì?',
        'Cước phí giao hàng?',
        'Tiền ship bao nhiêu?',
        'Chi phí vận chuyển?',
        'Phí giao hàng thế nào?',
        'Ship mất bao nhiêu tiền?',
        'Phí ship ra sao?',
        'Giá giao hàng?',
        'Tính phí ship như nào?',
        'Ship có đắt không?',
    ],
    
    # Thay đổi địa chỉ
    'Bạn có thể thay đổi địa chỉ giao hàng trước khi đơn hàng được xác nhận': [
        'Tôi có thể thay đổi địa chỉ giao hàng không?',
        'Đổi địa chỉ giao hàng được không?',
        'Có thể sửa địa chỉ ship không?',
        'Muốn đổi địa chỉ nhận hàng?',
        'Làm sao để thay đổi địa chỉ?',
        'Có được sửa địa chỉ không?',
        'Tôi muốn đổi chỗ giao hàng',
        'Có đổi địa chỉ được ko?',
        'Sửa địa chỉ nhận hàng thế nào?',
    ],
    
    # Theo dõi đơn hàng
    'Bạn có thể theo dõi đơn hàng qua phần "Đơn hàng của tôi" trên website': [
        'Làm sao để theo dõi đơn hàng?',
        'Xem đơn hàng ở đâu?',
        'Tra cứu đơn hàng thế nào?',
        'Kiểm tra đơn hàng như nào?',
        'Làm sao biết đơn đang ở đâu?',
        'Check đơn hàng ở đâu?',
        'Xem trạng thái đơn?',
        'Tìm đơn hàng của tôi?',
        'Theo dõi vận đơn?',
        'Kiểm tra tình trạng đơn?',
    ],
    
    # Không nhận được hàng
    'Vui lòng liên hệ ngay với chúng tôi qua hotline hoặc chat': [
        'Tôi không nhận được hàng phải làm sao?',
        'Không thấy hàng đến',
        'Chưa nhận được đồ',
        'Hàng không về',
        'Đơn hàng bị mất',
        'Không có hàng',
        'Ship hoài không thấy hàng',
        'Chờ mãi không có đồ',
        'Làm gì khi không nhận được hàng?',
    ],
    
    # Phương thức thanh toán
    'Chúng tôi hỗ trợ nhiều hình thức thanh toán: COD, chuyển khoản, ví điện tử, thẻ': [
        'Có những hình thức thanh toán nào?',
        'Thanh toán như thế nào?',
        'Có thể thanh toán bằng gì?',
        'Các cách thanh toán?',
        'Phương thức thanh toán là gì?',
        'Hỗ trợ thanh toán gì?',
        'Có thanh toán COD không?',
        'Thanh toán thế nào?',
        'Trả tiền như nào?',
        'Có những cách trả tiền nào?',
        'Tôi muốn thanh toán',
        'Có nhận COD không?',
        'Có chuyển khoản được không?',
        'Có thể trả bằng thẻ không?',
    ],
    
    # COD
    'COD là hình thức thanh toán rất an toàn. Bạn chỉ thanh toán khi nhận được hàng': [
        'Thanh toán COD có an toàn không?',
        'COD là gì?',
        'Ship COD như thế nào?',
        'Thanh toán khi nhận hàng?',
        'Có nhận COD không?',
        'COD có ok không?',
        'Trả tiền khi nhận hàng được không?',
        'Có ship COD ko?',
    ],
    
    # Hoàn tiền
    'Sau khi yêu cầu trả hàng được chấp nhận, tiền sẽ được hoàn lại trong vòng 7-14 ngày': [
        'Làm sao để được hoàn tiền?',
        'Hoàn tiền thế nào?',
        'Bao lâu thì hoàn tiền?',
        'Khi nào nhận lại tiền?',
        'Quy trình hoàn tiền?',
        'Hoàn tiền mất bao lâu?',
        'Tiền về khi nào?',
        'Refund trong bao lâu?',
    ],
    
    # Phai màu
    'Sản phẩm được sản xuất từ chất liệu cao cấp, giặt theo đúng hướng dẫn sẽ hạn chế phai màu': [
        'Sản phẩm có bị phai màu không?',
        'Đồ có phai không?',
        'Có bị phai màu ko?',
        'Giặt có phai không?',
        'Màu có bền không?',
        'Giặt nhiều có phai ko?',
    ],
    
    # Chọn size
    'Bạn có thể tham khảo bảng size chi tiết trên mỗi sản phẩm': [
        'Tôi nên chọn size như thế nào?',
        'Chọn size thế nào?',
        'Size nào vừa?',
        'Làm sao biết size?',
        'Cách chọn size?',
        'Size như nào?',
        'Tôi mặc size gì?',
        'Chọn size nào phù hợp?',
        'Bảng size ở đâu?',
        'Xem size thế nào?',
    ],
    
    # Giống hình
    'Chúng tôi cam kết hình ảnh sản phẩm 100% thật': [
        'Sản phẩm có giống hình không?',
        'Hàng có đúng với ảnh ko?',
        'Có giống ảnh không?',
        'Thật như hình không?',
        'Đồ có khác ảnh không?',
        'Có đúng như mô tả ko?',
    ],
    
    # Bảo quản
    'Nên giặt máy ở chế độ nhẹ nhàng, nhiệt độ dưới 30°C': [
        'Hướng dẫn bảo quản sản phẩm?',
        'Cách bảo quản đồ?',
        'Giặt thế nào?',
        'Làm sao để bảo quản?',
        'Cách giặt như nào?',
        'Bảo quản ra sao?',
        'Hướng dẫn giặt?',
    ],
    
    # Bảo hành
    'Chúng tôi bảo hành các lỗi kỹ thuật như đứt chỉ, bong keo trong vòng 3 tháng': [
        'Sản phẩm có bảo hành không?',
        'Có bảo hành ko?',
        'Bảo hành bao lâu?',
        'Chính sách bảo hành?',
        'Bảo hành như thế nào?',
        'Có được bảo hành không?',
    ],
    
    # Đăng ký tài khoản
    'Bạn có thể đăng ký tài khoản bằng cách click vào nút "Đăng ký"': [
        'Làm sao để đăng ký tài khoản?',
        'Đăng ký tài khoản thế nào?',
        'Cách tạo tài khoản?',
        'Tôi muốn đăng ký',
        'Làm thế nào để đăng ký?',
        'Đăng ký ở đâu?',
        'Tạo tài khoản như nào?',
    ],
    
    # Quên mật khẩu
    'Click vào "Quên mật khẩu" ở trang đăng nhập, nhập email đã đăng ký': [
        'Tôi quên mật khẩu phải làm sao?',
        'Quên mật khẩu',
        'Không nhớ mật khẩu',
        'Làm sao lấy lại mật khẩu?',
        'Quên pass',
        'Khôi phục mật khẩu?',
        'Reset mật khẩu thế nào?',
        'Lấy lại pass?',
    ],
    
    # Thay đổi thông tin
    'Đăng nhập vào tài khoản, vào mục "Thông tin cá nhân"': [
        'Làm sao để thay đổi thông tin tài khoản?',
        'Sửa thông tin cá nhân?',
        'Đổi thông tin tài khoản?',
        'Cập nhật thông tin?',
        'Thay đổi thông tin?',
        'Chỉnh sửa hồ sơ?',
    ],
    
    # Nhận mã giảm giá
    'Bạn có thể nhận mã giảm giá qua email, fanpage, hoặc đạt hạng thành viên': [
        'Làm sao để nhận mã giảm giá?',
        'Lấy mã giảm giá ở đâu?',
        'Có mã giảm giá không?',
        'Voucher ở đâu?',
        'Làm sao có voucher?',
        'Nhận mã giảm giá thế nào?',
        'Có khuyến mãi gì không?',
        'Mã khuyến mãi?',
    ],
    
    # Thời hạn mã giảm giá
    'Có, mỗi mã giảm giá có thời hạn sử dụng khác nhau được ghi rõ khi bạn nhận mã': [
        'Mã giảm giá có thời hạn sử dụng không?',
        'Voucher có hết hạn không?',
        'Mã có thời hạn ko?',
        'Dùng mã đến khi nào?',
        'Mã có hết hạn không?',
    ],
    
    # Dùng nhiều mã
    'Không, mỗi đơn hàng chỉ được sử dụng một mã giảm giá': [
        'Có thể dùng nhiều mã giảm giá cùng lúc không?',
        'Dùng nhiều voucher được ko?',
        'Có dùng nhiều mã không?',
        'Kết hợp mã giảm giá?',
        'Có stack được mã không?',
    ],
    
    # Tích điểm
    'Bạn sẽ tự động tích điểm khi mua hàng thành công. Mỗi 1.000đ chi tiêu = 1 điểm': [
        'Làm sao để tích điểm?',
        'Tích điểm thế nào?',
        'Cách tích điểm?',
        'Tích lũy điểm như nào?',
        'Làm gì để có điểm?',
        'Có điểm thưởng không?',
    ],
    
    # Thời gian hỗ trợ
    'Chúng tôi hỗ trợ khách hàng từ 8h00 - 22h00 hàng ngày': [
        'Thời gian làm việc của bộ phận hỗ trợ?',
        'Mấy giờ có hỗ trợ?',
        'Giờ làm việc?',
        'Khi nào có người trả lời?',
        'Có hỗ trợ 24/7 không?',
        'Làm việc mấy giờ?',
    ],
    
    # Liên hệ
    'Bạn có thể liên hệ qua hotline, email, chat trực tuyến trên website': [
        'Làm sao để liên hệ với cửa hàng?',
        'Liên hệ thế nào?',
        'Liên lạc như nào?',
        'Hotline là gì?',
        'Số điện thoại shop?',
        'Liên hệ qua đâu?',
        'Chat với shop?',
    ],
    
    # Cửa hàng trực tiếp
    'Có, chúng tôi có cửa hàng tại Hà Nội và TP.HCM': [
        'Có cửa hàng trực tiếp không?',
        'Shop có ở đâu?',
        'Địa chỉ cửa hàng?',
        'Có chi nhánh ở đâu?',
        'Cửa hàng gần tôi?',
        'Có thể đến xem hàng trực tiếp không?',
    ],
    
    # Đặt hàng
    'Chọn sản phẩm > Thêm vào giỏ hàng > Thanh toán > Điền thông tin': [
        'Làm sao để đặt hàng?',
        'Cách đặt hàng?',
        'Đặt hàng thế nào?',
        'Mua hàng như nào?',
        'Quy trình đặt hàng?',
        'Làm gì để mua?',
        'Cách mua hàng?',
        'Order thế nào?',
    ],
    
    # Hủy đơn
    'Bạn có thể hủy đơn hàng miễn phí trước khi đơn hàng được xác nhận': [
        'Tôi có thể hủy đơn hàng không?',
        'Hủy đơn được không?',
        'Làm sao để hủy đơn?',
        'Có hủy được ko?',
        'Muốn hủy đơn',
        'Cách hủy đơn hàng?',
        'Cancel đơn thế nào?',
    ],
    
    # Đơn bị hủy
    'Đơn hàng có thể bị hủy do sản phẩm hết hàng hoặc thông tin không chính xác': [
        'Đơn hàng của tôi bị hủy vì sao?',
        'Tại sao đơn bị hủy?',
        'Vì sao hủy đơn?',
        'Đơn bị hủy?',
        'Lý do hủy đơn?',
    ],
    
    # Đặt nhầm
    'Nếu đơn hàng chưa được xác nhận, bạn có thể hủy và đặt lại': [
        'Tôi đặt nhầm sản phẩm phải làm sao?',
        'Đặt nhầm hàng',
        'Order nhầm',
        'Muốn đổi sản phẩm đã đặt',
        'Đặt sai rồi',
    ],
    
    # Bảo mật thông tin
    'Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng': [
        'Thông tin cá nhân của tôi có được bảo mật không?',
        'Có an toàn không?',
        'Bảo mật thông tin?',
        'Có lộ thông tin ko?',
        'An toàn không?',
        'Có bị hack không?',
    ],
    
    # Thanh toán online
    'Website của chúng tôi sử dụng SSL encryption và tuân thủ chuẩn bảo mật': [
        'Thanh toán online có an toàn không?',
        'Trả tiền online có ok ko?',
        'Có an toàn khi thanh toán qua mạng không?',
        'Thanh toán trực tuyến có bảo mật ko?',
    ],
    
    # Lợi ích thành viên
    'Thành viên sẽ được tích điểm đổi quà, ưu đãi sinh nhật, giảm giá độc quyền': [
        'Lợi ích của thành viên là gì?',
        'Thành viên có gì?',
        'Quyền lợi thành viên?',
        'Đăng ký thành viên được gì?',
        'Ưu đãi cho thành viên?',
    ],
    
    # Nâng hạng
    'Hạng thành viên được tính dựa trên tổng giá trị đơn hàng trong năm': [
        'Làm sao để nâng hạng thành viên?',
        'Nâng hạng thế nào?',
        'Cách lên hạng?',
        'Điều kiện nâng hạng?',
        'Làm gì để lên hạng?',
    ],
    
    # Nước hoa chính hãng
    'Tất cả nước hoa tại shop đều là hàng chính hãng 100%': [
        'Nước hoa có phải hàng chính hãng không?',
        'Nước hoa thật không?',
        'Có phải hàng fake ko?',
        'Chính hãng không?',
        'Nước hoa xịn không?',
        'Có bảo đảm chính hãng ko?',
    ],
    
    # Test nước hoa
    'Tại cửa hàng trực tiếp, bạn hoàn toàn có thể test thử nước hoa trước khi mua': [
        'Nước hoa có được test thử không?',
        'Có thử nước hoa ko?',
        'Xịt thử được không?',
        'Test được không?',
        'Có được test ko?',
    ],
    
    # Bảo quản nước hoa
    'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp': [
        'Hướng dẫn bảo quản nước hoa?',
        'Cách bảo quản nước hoa?',
        'Để nước hoa thế nào?',
        'Bảo quản nước hoa như nào?',
    ],
}

def insert_variations_to_db():
    """Insert FAQ variations vào database"""
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    if not DATABASE_URL:
        DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
        DB_PORT = os.getenv("POSTGRES_PORT", "5432")
        DB_USER = os.getenv("POSTGRES_USER", "postgres")
        DB_PASS = os.getenv("POSTGRES_PASSWORD", "secret")
        DB_NAME = os.getenv("POSTGRES_DB", "tee_shop")
        DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    
    total_added = 0
    
    for answer_snippet, questions in FAQ_VARIATIONS.items():
        # Tìm câu trả lời đầy đủ trong database
        existing = session.query(FAQ).filter(
            FAQ.answer.like(f'%{answer_snippet}%')
        ).first()
        
        if existing:
            faq_type = existing.type
            full_answer = existing.answer
            
            # Thêm tất cả các biến thể câu hỏi
            for question in questions:
                # Kiểm tra xem câu hỏi đã tồn tại chưa
                exists = session.query(FAQ).filter(FAQ.question == question).first()
                if not exists:
                    new_faq = FAQ(
                        question=question,
                        answer=full_answer,
                        type=faq_type
                    )
                    session.add(new_faq)
                    total_added += 1
    
    session.commit()
    session.close()
    
    print(f"✅ Đã thêm {total_added} câu hỏi mới vào database!")
    print(f"📊 Tổng số bản ghi FAQ trong database: {total_added + 187}")

if __name__ == "__main__":
    print("🚀 Bắt đầu thêm biến thể câu hỏi...")
    insert_variations_to_db()
    print("✨ Hoàn thành!")
