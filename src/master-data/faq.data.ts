// FAQ Master Data for Chatbot Dataset
export const FAQ_META_DATA = [
  // Chính sách đổi trả
  {
    question: 'Tôi có thể đổi trả sản phẩm không?',
    answer:
      'Có, bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm cần còn nguyên tem mác, chưa qua sử dụng và giữ nguyên tình trạng ban đầu.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Điều kiện đổi trả sản phẩm là gì?',
    answer:
      'Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng, không có dấu hiệu bẩn bẩn hoặc hư hỏng. Sản phẩm phải được đóng gói nguyên vẹn như khi nhận hàng. Bạn cần cung cấp hóa đơn mua hàng.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Mất bao lâu để xử lý đổi trả?',
    answer:
      'Thời gian xử lý đổi trả thường từ 3-7 ngày làm việc kể từ khi chúng tôi nhận được sản phẩm hoàn trả. Chúng tôi sẽ kiểm tra sản phẩm và thông báo kết quả qua email hoặc điện thoại.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Ai chịu phí vận chuyển khi đổi trả?',
    answer:
      'Nếu sản phẩm bị lỗi từ phía shop, chúng tôi sẽ chịu toàn bộ phí vận chuyển đổi trả. Nếu đổi size hoặc đổi sang sản phẩm khác do lý do cá nhân, bạn sẽ chịu phí vận chuyển.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Sản phẩm sale có được đổi trả không?',
    answer:
      'Có, sản phẩm sale vẫn được đổi trả trong vòng 30 ngày nếu đáp ứng đủ điều kiện. Tuy nhiên, sản phẩm sale giảm giá trên 50% có thể không được hoàn tiền mà chỉ đổi size hoặc sản phẩm khác.',
    type: 'Chính sách đổi trả',
  },

  // Vận chuyển và giao hàng
  {
    question: 'Thời gian giao hàng là bao lâu?',
    answer:
      'Thời gian giao hàng phụ thuộc vào địa chỉ của bạn. Nội thành Hà Nội và TP.HCM: 1-2 ngày. Các tỉnh thành khác: 3-5 ngày. Vùng sâu vùng xa có thể mất 5-7 ngày.',
    type: 'Vận chuyển',
  },
  {
    question: 'Phí vận chuyển là bao nhiêu?',
    answer:
      'Phí vận chuyển dao động từ 15.000đ - 50.000đ tùy theo khu vực và trọng lượng đơn hàng. Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên trong nội thành và 800.000đ trở lên cho các tỉnh.',
    type: 'Vận chuyển',
  },
  {
    question: 'Tôi có thể thay đổi địa chỉ giao hàng không?',
    answer:
      'Bạn có thể thay đổi địa chỉ giao hàng trước khi đơn hàng được xác nhận và giao cho đơn vị vận chuyển. Vui lòng liên hệ hotline hoặc nhắn tin qua chat để thay đổi.',
    type: 'Vận chuyển',
  },
  {
    question: 'Làm sao để theo dõi đơn hàng?',
    answer:
      'Bạn có thể theo dõi đơn hàng qua phần "Đơn hàng của tôi" trên website hoặc app. Hoặc kiểm tra mã vận đơn được gửi qua email/SMS trên website của đơn vị vận chuyển.',
    type: 'Vận chuyển',
  },
  {
    question: 'Tôi không nhận được hàng phải làm sao?',
    answer:
      'Vui lòng liên hệ ngay với chúng tôi qua hotline hoặc chat. Chúng tôi sẽ kiểm tra với đơn vị vận chuyển và hỗ trợ bạn xử lý vấn đề nhanh nhất.',
    type: 'Vận chuyển',
  },

  // Thanh toán
  {
    question: 'Có những hình thức thanh toán nào?',
    answer:
      'Chúng tôi hỗ trợ nhiều hình thức thanh toán: COD (thanh toán khi nhận hàng), chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay), thẻ ATM/Visa/Mastercard.',
    type: 'Thanh toán',
  },
  {
    question: 'Thanh toán COD có an toàn không?',
    answer:
      'COD là hình thức thanh toán rất an toàn. Bạn chỉ thanh toán khi nhận được hàng và kiểm tra sản phẩm. Tuy nhiên, có thể phát sinh phí COD từ 10.000đ - 30.000đ tùy đơn vị vận chuyển.',
    type: 'Thanh toán',
  },
  {
    question: 'Tôi có thể thanh toán trước một phần không?',
    answer:
      'Hiện tại chúng tôi chưa hỗ trợ thanh toán trước một phần. Bạn cần thanh toán toàn bộ đơn hàng hoặc chọn thanh toán COD khi nhận hàng.',
    type: 'Thanh toán',
  },
  {
    question: 'Làm sao để được hoàn tiền?',
    answer:
      'Sau khi yêu cầu trả hàng được chấp nhận, tiền sẽ được hoàn lại qua tài khoản ngân hàng bạn đã đăng ký trong vòng 7-14 ngày làm việc. Vui lòng cung cấp thông tin tài khoản để được hoàn tiền.',
    type: 'Thanh toán',
  },

  // Sản phẩm
  {
    question: 'Sản phẩm có bị phai màu không?',
    answer:
      'Sản phẩm của chúng tôi được sản xuất từ chất liệu cao cấp, giặt theo đúng hướng dẫn sẽ hạn chế tối đa việc phai màu. Nên giặt lần đầu riêng, giặt với nước lạnh và tránh phơi trực tiếp dưới ánh nắng mặt trời.',
    type: 'Sản phẩm',
  },
  {
    question: 'Tôi nên chọn size như thế nào?',
    answer:
      'Bạn có thể tham khảo bảng size chi tiết trên mỗi sản phẩm. Chúng tôi cũng có tư vấn viên sẵn sàng hỗ trợ chọn size phù hợp qua chat hoặc hotline. Nếu không chắc chắn, hãy chọn size lớn hơn 1 size.',
    type: 'Sản phẩm',
  },
  {
    question: 'Sản phẩm có giống hình không?',
    answer:
      'Chúng tôi cam kết hình ảnh sản phẩm 100% thật. Tuy nhiên, màu sắc có thể chênh lệch 5-10% do ánh sáng khi chụp và màn hình hiển thị của từng thiết bị khác nhau.',
    type: 'Sản phẩm',
  },
  {
    question: 'Hướng dẫn bảo quản sản phẩm?',
    answer:
      'Nên giặt máy ở chế độ nhẹ nhàng, nhiệt độ dưới 30°C. Không sử dụng chất tẩy. Phơi ở nơi thoáng mát, tránh ánh nắng trực tiếp. Ủi ở nhiệt độ thấp. Bảo quản nơi khô ráo, thoáng mát.',
    type: 'Sản phẩm',
  },
  {
    question: 'Sản phẩm có bảo hành không?',
    answer:
      'Chúng tôi bảo hành các lỗi kỹ thuật như đứt chỉ, bong keo trong vòng 3 tháng kể từ ngày mua. Không bảo hành các lỗi do sử dụng không đúng cách hoặc hư hỏng do va đập.',
    type: 'Sản phẩm',
  },

  // Tài khoản
  {
    question: 'Làm sao để đăng ký tài khoản?',
    answer:
      'Bạn có thể đăng ký tài khoản bằng cách click vào nút "Đăng ký" trên website, điền đầy đủ thông tin email, mật khẩu và xác nhận qua email. Hoặc đăng ký nhanh qua tài khoản Google, Facebook.',
    type: 'Tài khoản',
  },
  {
    question: 'Tôi quên mật khẩu phải làm sao?',
    answer:
      'Click vào "Quên mật khẩu" ở trang đăng nhập, nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra cả hộp thư spam.',
    type: 'Tài khoản',
  },
  {
    question: 'Làm sao để thay đổi thông tin tài khoản?',
    answer:
      'Đăng nhập vào tài khoản, vào mục "Thông tin cá nhân", bạn có thể cập nhật họ tên, số điện thoại, địa chỉ, ảnh đại diện. Để thay đổi email hoặc mật khẩu, vui lòng liên hệ bộ phận hỗ trợ.',
    type: 'Tài khoản',
  },
  {
    question: 'Có thể xóa tài khoản không?',
    answer:
      'Có, bạn có thể yêu cầu xóa tài khoản bằng cách liên hệ với bộ phận hỗ trợ khách hàng. Lưu ý rằng sau khi xóa tài khoản, toàn bộ lịch sử đơn hàng và điểm tích lũy sẽ bị xóa và không thể khôi phục.',
    type: 'Tài khoản',
  },

  // Khuyến mãi
  {
    question: 'Làm sao để nhận mã giảm giá?',
    answer:
      'Bạn có thể nhận mã giảm giá qua nhiều cách: đăng ký nhận email, theo dõi fanpage, tham gia các chương trình khuyến mãi, sinh nhật, hoặc đạt hạng thành viên.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Mã giảm giá có thời hạn sử dụng không?',
    answer:
      'Có, mỗi mã giảm giá có thời hạn sử dụng khác nhau được ghi rõ khi bạn nhận mã. Vui lòng kiểm tra và sử dụng trước khi mã hết hạn. Mã không thể gia hạn sau khi hết hạn.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Có thể dùng nhiều mã giảm giá cùng lúc không?',
    answer:
      'Không, mỗi đơn hàng chỉ được sử dụng một mã giảm giá. Bạn nên chọn mã giảm giá có giá trị cao nhất để được ưu đãi tốt nhất.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Làm sao để tích điểm?',
    answer:
      'Bạn sẽ tự động tích điểm khi mua hàng thành công. Mỗi 1.000đ chi tiêu = 1 điểm. Điểm tích lũy có thể dùng để đổi quà hoặc giảm giá cho đơn hàng tiếp theo. 100 điểm = 10.000đ.',
    type: 'Khuyến mãi',
  },

  // Chăm sóc khách hàng
  {
    question: 'Thời gian làm việc của bộ phận hỗ trợ?',
    answer:
      'Chúng tôi hỗ trợ khách hàng từ 8h00 - 22h00 hàng ngày, kể cả thứ 7, chủ nhật và ngày lễ. Bạn có thể liên hệ qua hotline, email hoặc chat trực tuyến trên website.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Làm sao để liên hệ với cửa hàng?',
    answer:
      'Bạn có thể liên hệ qua: Hotline: 1900-xxxx, Email: support@shop.com, Chat trực tuyến trên website, Fanpage Facebook, hoặc đến trực tiếp cửa hàng theo địa chỉ trên website.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Có cửa hàng trực tiếp để tôi đến xem hàng không?',
    answer:
      'Có, chúng tôi có cửa hàng tại Hà Nội và TP.HCM. Bạn có thể xem địa chỉ chi tiết trong mục "Hệ thống cửa hàng". Nên gọi trước để được tư vấn và đảm bảo sản phẩm có sẵn.',
    type: 'Chăm sóc khách hàng',
  },

  // Đặt hàng
  {
    question: 'Làm sao để đặt hàng?',
    answer:
      'Chọn sản phẩm > Chọn size/màu > Thêm vào giỏ hàng > Xem giỏ hàng > Thanh toán > Điền thông tin giao hàng > Chọn phương thức thanh toán > Xác nhận đặt hàng.',
    type: 'Đặt hàng',
  },
  {
    question: 'Tôi có thể hủy đơn hàng không?',
    answer:
      'Bạn có thể hủy đơn hàng miễn phí trước khi đơn hàng được xác nhận và giao cho đơn vị vận chuyển. Sau đó, nếu muốn hủy bạn cần liên hệ hotline để được hỗ trợ.',
    type: 'Đặt hàng',
  },
  {
    question: 'Đơn hàng của tôi bị hủy vì sao?',
    answer:
      'Đơn hàng có thể bị hủy do: sản phẩm hết hàng, thông tin giao hàng không chính xác, không liên lạc được với bạn sau nhiều lần, hoặc phát hiện đơn hàng có dấu hiệu bất thường.',
    type: 'Đặt hàng',
  },
  {
    question: 'Tôi đặt nhầm sản phẩm phải làm sao?',
    answer:
      'Nếu đơn hàng chưa được xác nhận, bạn có thể hủy và đặt lại. Nếu đã xác nhận, vui lòng liên hệ hotline ngay để được hỗ trợ thay đổi hoặc bạn có thể đổi trả sau khi nhận hàng.',
    type: 'Đặt hàng',
  },

  // Bảo mật
  {
    question: 'Thông tin cá nhân của tôi có được bảo mật không?',
    answer:
      'Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Thông tin chỉ được sử dụng cho mục đích xử lý đơn hàng và không chia sẻ cho bên thứ ba khi chưa có sự đồng ý.',
    type: 'Bảo mật',
  },
  {
    question: 'Thanh toán online có an toàn không?',
    answer:
      'Website của chúng tôi sử dụng SSL 256-bit encryption và tuân thủ chuẩn bảo mật PCI DSS. Thông tin thanh toán được mã hóa và xử lý qua cổng thanh toán uy tín, an toàn tuyệt đối.',
    type: 'Bảo mật',
  },

  // Thành viên
  {
    question: 'Lợi ích của thành viên là gì?',
    answer:
      'Thành viên sẽ được: tích điểm đổi quà, ưu đãi sinh nhật, giảm giá độc quyền, thông tin khuyến mãi sớm nhất, hỗ trợ ưu tiên, và nhiều đặc quyền khác tùy theo hạng thành viên.',
    type: 'Thành viên',
  },
  {
    question: 'Làm sao để nâng hạng thành viên?',
    answer:
      'Hạng thành viên được tính dựa trên tổng giá trị đơn hàng trong năm: Bạc (>2 triệu), Vàng (>5 triệu), Kim Cương (>10 triệu). Hạng càng cao, ưu đãi càng nhiều.',
    type: 'Thành viên',
  },

  // Nước hoa
  {
    question: 'Nước hoa có phải hàng chính hãng không?',
    answer:
      'Tất cả nước hoa tại shop đều là hàng chính hãng 100%, có tem nhập khẩu và phiếu bảo hành. Chúng tôi cam kết hoàn tiền 200% nếu phát hiện hàng giả.',
    type: 'Nước hoa',
  },
  {
    question: 'Nước hoa có được test thử không?',
    answer:
      'Tại cửa hàng trực tiếp, bạn hoàn toàn có thể test thử nước hoa trước khi mua. Với đơn online, bạn có thể tham khảo mô tả hương thơm chi tiết hoặc chat với tư vấn viên.',
    type: 'Nước hoa',
  },
  {
    question: 'Hướng dẫn bảo quản nước hoa?',
    answer:
      'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và nhiệt độ cao. Đậy nắp kỹ sau khi sử dụng. Không để trong nhà tắm hoặc gần nguồn nhiệt. Hạn sử dụng thường là 3-5 năm.',
    type: 'Nước hoa',
  },
  {
    question: 'Dung tích nước hoa nào phù hợp để mua?',
    answer:
      'Nếu bạn mới dùng hoặc muốn thử nhiều mùi hương, nên chọn chai 50ml. Nếu đã tìm được mùi hương yêu thích và dùng thường xuyên, chai 100ml sẽ tiết kiệm hơn. Chai 30ml phù hợp để mang theo khi đi du lịch.',
    type: 'Nước hoa',
  },

  // Chính sách đổi trả - thêm
  {
    question: 'Tôi có thể đổi size sản phẩm không?',
    answer:
      'Có, bạn hoàn toàn có thể đổi size trong vòng 30 ngày. Sản phẩm cần còn nguyên tem mác, chưa qua sử dụng. Nếu chênh lệch giá giữa các size, bạn sẽ cần thanh toán thêm hoặc được hoàn lại tiền chênh lệch.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Sản phẩm bị lỗi có được đổi trả không?',
    answer:
      'Tất nhiên! Nếu sản phẩm bị lỗi kỹ thuật, đứt chỉ, bung keo hoặc lỗi từ nhà sản xuất, bạn hoàn toàn được đổi trả miễn phí 100%. Chúng tôi sẽ chịu toàn bộ chi phí vận chuyển và xử lý trong 24h.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Có thể đổi sang sản phẩm khác không?',
    answer:
      'Có, bạn có thể đổi sang sản phẩm khác cùng giá hoặc cao hơn (bù thêm tiền chênh lệch). Nếu đổi sang sản phẩm giá thấp hơn, phần chênh lệch sẽ được chuyển thành voucher cho lần mua sau.',
    type: 'Chính sách đổi trả',
  },

  // Vận chuyển - thêm
  {
    question: 'Ship COD có giao tận nhà không?',
    answer:
      'Có, dịch vụ COD giao tận nhà đến tận tay bạn. Shipper sẽ liên hệ trước khi giao để xác nhận bạn có ở nhà. Bạn có thể kiểm tra hàng trước khi thanh toán.',
    type: 'Vận chuyển',
  },
  {
    question: 'Có giao hàng vào cuối tuần không?',
    answer:
      'Có, chúng tôi giao hàng cả thứ 7, chủ nhật và ngày lễ. Tuy nhiên, thời gian có thể chậm hơn 1-2 ngày so với ngày thường do lượng đơn nhiều.',
    type: 'Vận chuyển',
  },
  {
    question: 'Tôi có thể chọn thời gian giao hàng không?',
    answer:
      'Bạn có thể ghi chú thời gian mong muốn khi đặt hàng (ví dụ: giao buổi chiều, sau 18h). Chúng tôi sẽ cố gắng đáp ứng tối đa yêu cầu của bạn, tuy nhiên không đảm bảo 100% do phụ thuộc đơn vị vận chuyển.',
    type: 'Vận chuyển',
  },
  {
    question: 'Phí vận chuyển miễn phí áp dụng cho tất cả sản phẩm?',
    answer:
      'Có, chương trình miễn phí vận chuyển áp dụng cho tất cả sản phẩm khi đơn hàng đạt giá trị tối thiểu. Một số sản phẩm cồng kềnh có thể phát sinh phí vượt cân, bạn sẽ được thông báo trước.',
    type: 'Vận chuyển',
  },

  // Thanh toán - thêm
  {
    question: 'Tôi có thể thanh toán bằng thẻ quốc tế không?',
    answer:
      'Có, chúng tôi chấp nhận thẻ Visa, Mastercard, JCB, American Express của tất cả các ngân hàng trong và ngoài nước. Giao dịch được xử lý qua cổng thanh toán quốc tế an toàn.',
    type: 'Thanh toán',
  },
  {
    question: 'Có thể thanh toán qua ví điện tử nào?',
    answer:
      'Chúng tôi hỗ trợ các ví điện tử phổ biến: MoMo, ZaloPay, VNPay, ShopeePay. Thanh toán qua ví thường có ưu đãi hoàn tiền hoặc giảm giá từ ví.',
    type: 'Thanh toán',
  },
  {
    question: 'Tôi đã chuyển khoản nhưng đơn hàng chưa được xác nhận?',
    answer:
      'Vui lòng chờ từ 15-30 phút để hệ thống cập nhật. Nếu quá thời gian này đơn hàng vẫn chưa được xác nhận, vui lòng liên hệ hotline và cung cấp ảnh chụp hoặc mã giao dịch để được hỗ trợ nhanh nhất.',
    type: 'Thanh toán',
  },
  {
    question: 'Có phí thanh toán online không?',
    answer:
      'Không, chúng tôi hoàn toàn KHÔNG thu phí thanh toán online. Tuy nhiên, ngân hàng hoặc ví điện tử của bạn có thể phát sinh phí giao dịch tùy theo chính sách của họ.',
    type: 'Thanh toán',
  },

  // Sản phẩm - thêm
  {
    question: 'Làm sao biết sản phẩm còn hàng không?',
    answer:
      'Trên trang sản phẩm sẽ hiển thị tình trạng "Còn hàng" hoặc "Hết hàng". Nếu hết hàng, bạn có thể đăng ký nhận thông báo khi hàng về. Hoặc liên hệ hotline để được tư vấn sản phẩm tương tự.',
    type: 'Sản phẩm',
  },
  {
    question: 'Sản phẩm có kèm theo phụ kiện gì không?',
    answer:
      'Tùy từng sản phẩm sẽ có phụ kiện đi kèm khác nhau, được ghi rõ trong mô tả sản phẩm. Thông thường áo thun kèm móc treo, giày kèm hộp và giấy gói, nước hoa kèm hộp chính hãng.',
    type: 'Sản phẩm',
  },
  {
    question: 'Chất liệu sản phẩm là gì?',
    answer:
      'Mỗi sản phẩm có chất liệu khác nhau, được ghi chi tiết trong mục "Thông tin sản phẩm". Chúng tôi sử dụng chất liệu cao cấp như cotton 100%, kaki, denim, linen, da thật, vải thể thao...',
    type: 'Sản phẩm',
  },
  {
    question: 'Sản phẩm có co giãn không?',
    answer:
      'Thông tin về độ co giãn được ghi rõ trong phần mô tả sản phẩm. Sản phẩm thể thao thường co giãn 4 chiều, áo phông cotton co giãn nhẹ, áo sơ mi và quây tây ít co giãn.',
    type: 'Sản phẩm',
  },

  // Tài khoản - thêm
  {
    question: 'Tôi có bắt buộc phải đăng ký tài khoản không?',
    answer:
      'Không bắt buộc, bạn có thể mua hàng với tư cách khách vãng lai. Tuy nhiên, đăng ký tài khoản sẽ giúp bạn theo dõi đơn hàng dễ dàng hơn, tích điểm, nhận ưu đãi và lưu thông tin giao hàng.',
    type: 'Tài khoản',
  },
  {
    question: 'Làm sao để lưu địa chỉ giao hàng?',
    answer:
      'Đăng nhập tài khoản > Vào "Sổ địa chỉ" > Thêm địa chỉ mới. Bạn có thể lưu nhiều địa chỉ và đặt một địa chỉ làm mặc định. Khi đặt hàng, chỉ cần chọn địa chỉ đã lưu.',
    type: 'Tài khoản',
  },
  {
    question: 'Tại sao tôi không đăng nhập được?',
    answer:
      'Có thể do: sai email/mật khẩu, tài khoản bị khóa, hoặc lỗi hệ thống. Hãy thử reset mật khẩu, xóa cache trình duyệt. Nếu vẫn không được, liên hệ bộ phận hỗ trợ để được kiểm tra.',
    type: 'Tài khoản',
  },

  // Khuyến mãi - thêm
  {
    question: 'Làm sao để biết có chương trình khuyến mãi?',
    answer:
      'Bạn có thể theo dõi khuyến mãi qua: website (banner, popup), email đăng ký nhận tin, fanpage Facebook, Zalo Official, hoặc app di động. Thành viên sẽ được ưu tiên nhận thông tin sớm nhất.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Mã giảm giá có áp dụng cho tất cả sản phẩm không?',
    answer:
      'Tùy từng chương trình khuyến mãi, mã giảm giá có thể áp dụng cho tất cả sản phẩm hoặc một số sản phẩm cụ thể. Điều kiện sử dụng được ghi rõ khi bạn nhận mã.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Điểm tích lũy có hết hạn không?',
    answer:
      'Điểm tích lũy có thời hạn 1 năm kể từ ngày tích. Điểm sắp hết hạn sẽ được thông báo qua email và SMS. Hãy sử dụng điểm trước khi hết hạn để không bị mất.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Có chương trình giới thiệu bạn bè không?',
    answer:
      'Có! Giới thiệu bạn bè đăng ký và mua hàng thành công, cả bạn và người được giới thiệu đều nhận được mã giảm giá. Bạn cũng được tích điểm thưởng tương ứng với giá trị đơn hàng của người được giới thiệu.',
    type: 'Khuyến mãi',
  },

  // Chăm sóc khách hàng - thêm
  {
    question: 'Tôi muốn góp ý về sản phẩm/dịch vụ?',
    answer:
      'Chúng tôi rất trân trọng mọi góp ý từ khách hàng. Bạn có thể gửi góp ý qua: email feedback@shop.com, form góp ý trên website, hoặc đánh giá sản phẩm sau khi mua hàng. Mọi ý kiến đều được ghi nhận và phản hồi.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Có dịch vụ gói quà không?',
    answer:
      'Có, chúng tôi có dịch vụ gói quà miễn phí cho đơn hàng từ 300.000đ. Bạn có thể chọn kiểu gói và viết lời nhắn trong phần ghi chú khi đặt hàng. Dịch vụ gói quà cao cấp có tính phí từ 15.000đ.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Có chương trình tri ân khách hàng thân thiết không?',
    answer:
      'Có! Chúng tôi thường xuyên có các chương trình tri ân như: sale riêng cho thành viên, quà tặng sinh nhật, ưu đãi đặc biệt vào các dịp lễ, và nhiều hoạt động gắn kết cộng đồng khách hàng.',
    type: 'Chăm sóc khách hàng',
  },

  // Đặt hàng - thêm
  {
    question: 'Tôi có thể đặt hàng số lượng lớn không?',
    answer:
      'Có, chúng tôi hỗ trợ đặt hàng số lượng lớn với giá ưu đãi. Vui lòng liên hệ bộ phận bán sỉ qua email wholesale@shop.com hoặc hotline để được tư vấn và báo giá chi tiết.',
    type: 'Đặt hàng',
  },
  {
    question: 'Có thể đặt hàng qua điện thoại không?',
    answer:
      'Có, bạn có thể gọi hotline để đặt hàng trực tiếp. Nhân viên sẽ hỗ trợ bạn chọn sản phẩm, tư vấn size và nhận thông tin giao hàng. Phương thức này phù hợp cho khách hàng không quen mua sắm online.',
    type: 'Đặt hàng',
  },
  {
    question: 'Đơn hàng bị treo "Đang xử lý" quá lâu?',
    answer:
      'Đơn hàng thường được xử lý trong 24h. Nếu quá thời gian này, có thể do: đang kiểm tra tồn kho, xác minh thanh toán, hoặc cao điểm đơn hàng. Vui lòng liên hệ để được kiểm tra cụ thể.',
    type: 'Đặt hàng',
  },

  // Bảo mật - thêm
  {
    question: 'Làm sao để bảo vệ tài khoản của tôi?',
    answer:
      'Nên: sử dụng mật khẩu mạnh (ít nhất 8 ký tự, có chữ hoa, số, ký tự đặc biệt), không chia sẻ mật khẩu, đăng xuất sau khi dùng trên máy công cộng, cập nhật mật khẩu định kỳ, cảnh giác với email/tin nhắn lừa đảo.',
    type: 'Bảo mật',
  },
  {
    question: 'Tôi có thể tin tưởng website này không?',
    answer:
      'Website đã được chứng nhận an toàn với SSL, đăng ký kinh doanh hợp pháp, có hàng nghìn đánh giá tích cực từ khách hàng. Bạn có thể kiểm tra thông tin doanh nghiệp tại footer website hoặc fanpage chính thức.',
    type: 'Bảo mật',
  },

  // Thành viên - thêm
  {
    question: 'Ưu đãi sinh nhật thành viên là gì?',
    answer:
      'Trong tháng sinh nhật, thành viên sẽ nhận: voucher giảm giá 15-30% (tùy hạng), quà tặng đặc biệt, tích điểm gấp đôi cho đơn hàng. Voucher sẽ được gửi qua email trước 7 ngày.',
    type: 'Thành viên',
  },
  {
    question: 'Hạng thành viên có bị giảm không?',
    answer:
      'Hạng thành viên được tính lại vào đầu năm dựa trên tổng giá trị đơn hàng của năm trước. Nếu không đạt đủ điều kiện, hạng sẽ giảm xuống. Tuy nhiên, điểm tích lũy vẫn được giữ nguyên.',
    type: 'Thành viên',
  },
  {
    question: 'Điểm tích lũy có thể chuyển nhượng không?',
    answer:
      'Không, điểm tích lũy gắn liền với tài khoản cá nhân và không thể chuyển nhượng. Tuy nhiên, bạn có thể dùng điểm để mua quà tặng cho người khác.',
    type: 'Thành viên',
  },

  // Nước hoa - thêm
  {
    question: 'Sự khác biệt giữa Eau de Parfum và Eau de Toilette?',
    answer:
      'Eau de Parfum (EDP) có nồng độ hương 15-20%, lưu hương 6-8 tiếng, mùi đậm. Eau de Toilette (EDT) có nồng độ 5-15%, lưu hương 3-5 tiếng, mùi nhẹ hơn. EDP thích hợp buổi tối, EDT phù hợp ban ngày.',
    type: 'Nước hoa',
  },
  {
    question: 'Nước hoa nam và nữ khác nhau thế nào?',
    answer:
      'Nước hoa nam thường có hương gỗ, xạ hương, gia vị mạnh mẽ. Nước hoa nữ thiên về hương hoa, trái cây ngọt ngào. Tuy nhiên, không có quy tắc cứng nhắc, bạn hoàn toàn có thể dùng theo sở thích cá nhân.',
    type: 'Nước hoa',
  },
  {
    question:
      'Tại sao cùng một loại nước hoa nhưng trên mỗi người lại khác nhau?',
    answer:
      'Mùi nước hoa phụ thuộc vào pH da, thân nhiệt, chế độ ăn uống, thuốc men của mỗi người. Vì vậy cùng một mùi hương có thể tỏa ra khác nhau trên mỗi người. Nên test thử trước khi mua.',
    type: 'Nước hoa',
  },
  {
    question: 'Cách xịt nước hoa đúng cách?',
    answer:
      'Xịt vào các điểm mạch như cổ tay, sau tai, cổ, khuỷu tay. Xịt từ khoảng cách 15-20cm. Không xịt vào quần áo vì có thể để lại vết ố. Không cọ xát sau khi xịt. Xịt sau khi tắm khi da còn ẩm để lưu hương lâu hơn.',
    type: 'Nước hoa',
  },
  {
    question: 'Nước hoa mini có chính hãng không?',
    answer:
      'Có, chúng tôi có nước hoa mini/tester chính hãng từ các thương hiệu. Nước hoa mini thích hợp để thử mùi hương hoặc mang theo du lịch. Giá thành rẻ hơn chai full size nhưng vẫn đảm bảo chất lượng.',
    type: 'Nước hoa',
  },

  // Giày dép
  {
    question: 'Giày có bị chật sau một thời gian đi không?',
    answer:
      'Giày da thật thường sẽ giãn ra một chút sau vài lần đi. Nếu chọn đúng size và đi đúng cách, giày sẽ ôm chân hơn và thoải mái hơn. Giày thể thao vải ít giãn hơn giày da.',
    type: 'Sản phẩm',
  },
  {
    question: 'Làm sao để chọn size giày phù hợp?',
    answer:
      'Đo chiều dài bàn chân, đối chiếu với bảng size. Nên thử giày vào buổi chiều vì bàn chân hơi phồng lên. Để khoảng trống 0.5-1cm ở mũi giày. Nếu mua online, nên đọc review về size của sản phẩm.',
    type: 'Sản phẩm',
  },
  {
    question: 'Giày có chống nước không?',
    answer:
      'Tùy loại giày. Giày da thường được xử lý chống nước nhẹ, sneaker vải không chống nước. Sản phẩm có tính năng chống nước sẽ được ghi rõ trong mô tả. Nên xịt chống nước định kỳ để bảo vệ giày tốt hơn.',
    type: 'Sản phẩm',
  },
  {
    question: 'Hướng dẫn bảo quản giày?',
    answer:
      'Làm sạch sau mỗi lần đi, phơi khô tự nhiên (không phơi nắng trực tiếp). Nhồi giấy báo vào giày để giữ form. Bảo quản nơi thoáng mát, khô ráo. Đánh xi định kỳ cho giày da. Luân phiên nhiều đôi giày.',
    type: 'Sản phẩm',
  },

  // Quần áo
  {
    question: 'Áo có bị nhăn khi vận chuyển không?',
    answer:
      'Sản phẩm sẽ được gấp gọn và đóng gói cẩn thận. Có thể bị nhăn nhẹ trong quá trình vận chuyển. Bạn có thể ủi hoặc treo áo lên, sau vài giờ nếp nhăn sẽ tự phẳng. Ủi ở nhiệt độ thấp và mặt trái.',
    type: 'Sản phẩm',
  },
  {
    question: 'Quần jean có bị lem màu không?',
    answer:
      'Quần jean mới thường lem màu nhẹ ở lần giặt đầu. Nên giặt riêng lần đầu với nước lạnh, ngâm trong dung dịch muối trước khi giặt để cố định màu. Sau vài lần giặt sẽ hết lem.',
    type: 'Sản phẩm',
  },
  {
    question: 'Áo có bị co rút sau khi giặt không?',
    answer:
      'Nếu giặt đúng cách theo hướng dẫn, áo sẽ không co rút. Không giặt nước nóng, không vắt mạnh, không sấy khô. Áo cotton có thể co nhẹ 2-3% ở lần giặt đầu, đã được tính sẵn trong size.',
    type: 'Sản phẩm',
  },
  {
    question: 'Form áo là regular, slim hay oversize?',
    answer:
      'Form áo được ghi rõ trong mô tả sản phẩm và bảng size. Regular fit: vừa vặn thoải mái. Slim fit: ôm body. Oversize: rộng rãi. Bạn có thể xem ảnh người mẫu mặc để hình dung rõ hơn.',
    type: 'Sản phẩm',
  },

  // Đơn hàng - chi tiết hơn
  {
    question: 'Tôi có thể đặt hàng nhiều sản phẩm khác màu/size không?',
    answer:
      'Có, bạn hoàn toàn có thể thêm nhiều sản phẩm với màu/size khác nhau vào giỏ hàng. Mỗi sản phẩm sẽ được tính là một item riêng. Đặt nhiều sản phẩm có thể được giảm giá và miễn phí ship.',
    type: 'Đặt hàng',
  },
  {
    question: 'Có thể chia đơn hàng giao nhiều địa chỉ không?',
    answer:
      'Hiện tại mỗi đơn hàng chỉ giao đến một địa chỉ. Nếu muốn giao nhiều địa chỉ, bạn cần tạo nhiều đơn hàng riêng. Liên hệ hotline nếu cần hỗ trợ đặt nhiều đơn cùng lúc.',
    type: 'Đặt hàng',
  },
  {
    question: 'Đơn hàng có được bảo hiểm không?',
    answer:
      'Đơn hàng được bảo hiểm trong quá trình vận chuyển. Nếu hàng bị thất lạc hoặc hư hỏng do vận chuyển, chúng tôi sẽ hoàn tiền 100% hoặc gửi lại sản phẩm mới miễn phí.',
    type: 'Đặt hàng',
  },
  {
    question: 'Tôi muốn mua quà tặng, có thể không ghi giá không?',
    answer:
      'Có, khi đặt hàng quà tặng, bạn có thể ghi chú "Không kèm hóa đơn" hoặc "Quà tặng". Chúng tôi sẽ không để phiếu giá vào gói hàng. Bạn cũng có thể yêu cầu gói quà và viết thiệp.',
    type: 'Đặt hàng',
  },

  // Chương trình khách hàng
  {
    question: 'Có ưu đãi cho khách hàng mua lần đầu không?',
    answer:
      'Có! Khách hàng mới đăng ký sẽ nhận voucher giảm 10-15% cho đơn đầu tiên. Đăng ký nhận email để nhận mã ngay. Một số dịp đặc biệt có thể có ưu đãi cao hơn cho khách mới.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Có chương trình tặng quà cho đơn hàng không?',
    answer:
      'Có, đơn hàng đạt giá trị nhất định sẽ được tặng quà. Quà tặng thay đổi theo từng chương trình khuyến mãi. Thông tin quà tặng được hiển thị rõ ràng trên website và khi thanh toán.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Làm sao để đổi quà bằng điểm tích lũy?',
    answer:
      'Vào mục "Điểm thưởng" trong tài khoản, chọn quà muốn đổi. Hệ thống sẽ trừ điểm và gửi quà đến địa chỉ bạn đăng ký. Miễn phí vận chuyển cho quà đổi điểm.',
    type: 'Khuyến mãi',
  },

  // Vận chuyển - chi tiết
  {
    question: 'Shipper có cho xem hàng không?',
    answer:
      'Với đơn COD, bạn có thể yêu cầu shipper cho xem bên ngoài gói hàng. Không mở hàng hoàn toàn vì lý do vệ sinh. Nếu nghi ngờ, có thể từ chối nhận và liên hệ shop để xử lý.',
    type: 'Vận chuyển',
  },
  {
    question: 'Hàng bị hư hỏng trong quá trình vận chuyển?',
    answer:
      'Vui lòng chụp ảnh ngay khi nhận hàng (cả bao bì và sản phẩm), liên hệ hotline trong 24h. Chúng tôi sẽ đổi sản phẩm mới hoặc hoàn tiền 100%. Shop chịu mọi chi phí.',
    type: 'Vận chuyển',
  },
  {
    question: 'Có dịch vụ giao hàng hỏa tốc không?',
    answer:
      'Có, dịch vụ giao hỏa tốc trong 2-4 tiếng ở nội thành HN và HCM với phí 50.000đ. Chỉ áp dụng trong giờ hành chính. Liên hệ hotline để sắp xếp giao hỏa tốc.',
    type: 'Vận chuyển',
  },

  // Thanh toán - chi tiết
  {
    question: 'Có thể thanh toán bằng điểm tích lũy không?',
    answer:
      'Có, bạn có thể dùng điểm tích lũy để giảm giá đơn hàng. Tỷ lệ quy đổi: 100 điểm = 10.000đ. Tối đa sử dụng 50% giá trị đơn hàng. Phần còn lại thanh toán bằng tiền mặt hoặc chuyển khoản.',
    type: 'Thanh toán',
  },
  {
    question: 'Có thể thanh toán sau khi nhận hàng online không?',
    answer:
      'Có, đó chính là phương thức COD (Cash On Delivery). Bạn thanh toán tiền mặt cho shipper khi nhận hàng. Có thể phát sinh phí COD từ 10.000-30.000đ tùy khu vực.',
    type: 'Thanh toán',
  },
  {
    question: 'Hóa đơn VAT có được xuất không?',
    answer:
      'Có, chúng tôi xuất hóa đơn VAT cho doanh nghiệp. Vui lòng gửi thông tin công ty (tên, MST, địa chỉ) qua email trước khi thanh toán. Hóa đơn sẽ được gửi kèm hàng hoặc qua email.',
    type: 'Thanh toán',
  },

  // Bảo mật - chi tiết
  {
    question: 'Dữ liệu thẻ tín dụng của tôi có được lưu không?',
    answer:
      'KHÔNG, chúng tôi không lưu trữ thông tin thẻ tín dụng của khách hàng. Thanh toán được xử lý trực tiếp qua cổng thanh toán an toàn của ngân hàng. Mỗi giao dịch phải nhập lại thông tin thẻ.',
    type: 'Bảo mật',
  },
  {
    question: 'Tài khoản bị hack phải làm sao?',
    answer:
      'Ngay lập tức liên hệ hotline để khóa tài khoản tạm thời. Đổi mật khẩu ngay. Kiểm tra lịch sử đơn hàng và giao dịch. Báo cáo các hoạt động bất thường. Chúng tôi sẽ hỗ trợ xác minh và bảo vệ tài khoản.',
    type: 'Bảo mật',
  },

  // Chăm sóc khách hàng - chi tiết
  {
    question: 'Có thể đặt hẹn tư vấn trực tiếp không?',
    answer:
      'Có, bạn có thể đặt lịch hẹn tư vấn tại cửa hàng qua hotline hoặc form đặt lịch trên website. Tư vấn viên sẽ dành thời gian riêng tư vấn chi tiết về sản phẩm phù hợp với bạn.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Shop có tuyển cộng tác viên bán hàng không?',
    answer:
      'Có, chúng tôi có chương trình cộng tác viên/affiliate marketing. Hoa hồng hấp dẫn cho mỗi đơn hàng thành công. Liên hệ email partnership@shop.com để biết thêm chi tiết và đăng ký.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Có thể tham quan nhà máy/xưởng sản xuất không?',
    answer:
      'Chúng tôi có tổ chức tour tham quan định kỳ cho khách hàng thân thiết và đối tác. Đăng ký qua email để được thông báo lịch tham quan. Bạn sẽ được tận mắt chứng kiến quy trình sản xuất.',
    type: 'Chăm sóc khách hàng',
  },

  // Review và đánh giá
  {
    question: 'Làm sao để đánh giá sản phẩm?',
    answer:
      'Sau khi nhận hàng, vào mục "Đơn hàng của tôi", chọn đơn hàng đã nhận, click "Đánh giá". Viết nhận xét, chọn số sao, có thể đính kèm ảnh sản phẩm thực tế. Đánh giá có ảnh sẽ được tặng thêm điểm thưởng.',
    type: 'Sản phẩm',
  },
  {
    question: 'Đánh giá có được kiểm duyệt không?',
    answer:
      'Chúng tôi có kiểm duyệt để lọc spam và ngôn từ không phù hợp, nhưng KHÔNG xóa đánh giá tiêu cực. Mọi ý kiến chân thành đều được đăng tải. Đánh giá xấu giúp chúng tôi cải thiện sản phẩm và dịch vụ.',
    type: 'Sản phẩm',
  },

  // Về công ty
  {
    question: 'Sản phẩm được sản xuất ở đâu?',
    answer:
      'Sản phẩm được sản xuất tại Việt Nam và nhập khẩu từ các quốc gia có uy tín về thời trang như Hàn Quốc, Thái Lan. Nguồn gốc xuất xứ được ghi rõ trên mỗi sản phẩm.',
    type: 'Sản phẩm',
  },
  {
    question: 'Shop có chính sách môi trường không?',
    answer:
      'Có, chúng tôi cam kết: sử dụng bao bì thân thiện môi trường, tái chế vải thừa, giảm thiểu rác thải sản xuất, hỗ trợ chương trình trồng cây, thu hồi quần áo cũ để tái chế. Tham gia "Go Green" để nhận ưu đãi.',
    type: 'Chính sách đổi trả',
  },

  // Thêm câu hỏi về chính sách
  {
    question: 'Chính sách bảo hành kéo dài bao lâu?',
    answer:
      'Bảo hành 3 tháng cho lỗi kỹ thuật từ nhà sản xuất như đứt chỉ may, bong keo, bục khuy. Một số sản phẩm cao cấp có bảo hành 6-12 tháng. Không bảo hành cho hư hỏng do sử dụng sai cách hoặc cố ý.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Nếu size không vừa có được đổi miễn phí không?',
    answer:
      'Có, đổi size miễn phí trong 30 ngày nếu sản phẩm còn nguyên tem mác. Khách chịu phí ship hoàn lại, shop chịu phí ship gửi size mới. Đổi size lần 2 trở đi có thể phát sinh phí.',
    type: 'Chính sách đổi trả',
  },

  // Thêm về vận chuyển
  {
    question: 'Có giao hàng quốc tế không?',
    answer:
      'Hiện tại chúng tôi chỉ giao hàng trong nội địa Việt Nam. Dự kiến sắp tới sẽ mở rộng giao hàng quốc tế đến một số nước Đông Nam Á. Vui lòng theo dõi thông báo trên website.',
    type: 'Vận chuyển',
  },
  {
    question: 'Shipper có liên hệ trước khi giao không?',
    answer:
      'Có, shipper sẽ gọi điện hoặc nhắn tin xác nhận trước khi giao hàng 30-60 phút. Nếu không liên lạc được, hàng sẽ được mang về bưu cục và giao lại vào ngày hôm sau.',
    type: 'Vận chuyển',
  },
  {
    question: 'Có thể yêu cầu giao hàng vào khung giờ cụ thể?',
    answer:
      'Bạn có thể ghi chú khung giờ mong muốn (sáng 8-12h, chiều 13-17h, tối 17-20h). Chúng tôi sẽ cố gắng đáp ứng nhưng không đảm bảo 100% do phụ thuộc lộ trình của shipper.',
    type: 'Vận chuyển',
  },

  // Thêm về thanh toán
  {
    question: 'Có hỗ trợ trả góp không?',
    answer:
      'Có, chúng tôi hỗ trợ trả góp qua thẻ tín dụng cho đơn hàng từ 3 triệu trở lên. Các ngân hàng liên kết: Techcombank, VPBank, Sacombank, FE Credit. Lãi suất 0% cho kỳ hạn 3-6 tháng.',
    type: 'Thanh toán',
  },
  {
    question: 'Chuyển khoản nhầm số tiền phải làm sao?',
    answer:
      'Liên hệ ngay hotline với thông tin giao dịch. Nếu chuyển thừa, chúng tôi sẽ hoàn lại phần chênh lệch trong 2-3 ngày. Nếu chuyển thiếu, bạn cần bổ sung hoặc shop sẽ điều chỉnh đơn hàng.',
    type: 'Thanh toán',
  },
  {
    question: 'Có thể đặt cọc trước không?',
    answer:
      'Có, với đơn hàng giá trị cao hoặc hàng order, bạn có thể đặt cọc 30-50%. Phần còn lại thanh toán khi nhận hàng. Nếu hủy đơn, tiền cọc sẽ được chuyển thành voucher.',
    type: 'Thanh toán',
  },

  // Thêm về sản phẩm
  {
    question: 'Có bán phụ kiện đi kèm riêng không?',
    answer:
      'Có, chúng tôi có bán riêng thắt lưng, cà vạt, nơ, tất, móc khóa, túi vải. Có thể mua kèm combo sản phẩm chính để được giảm giá phụ kiện từ 10-20%.',
    type: 'Sản phẩm',
  },
  {
    question: 'Sản phẩm limited edition có được bổ sung hàng không?',
    answer:
      'Sản phẩm limited edition số lượng có hạn, một khi hết hàng sẽ không sản xuất thêm. Đăng ký nhận thông báo cho các collection limited mới để không bỏ lỡ.',
    type: 'Sản phẩm',
  },
  {
    question: 'Có dịch vụ may đo theo yêu cầu không?',
    answer:
      'Có, chúng tôi nhận may đo suit, áo sơ mi, quần tây theo số đo cá nhân. Thời gian may 7-14 ngày. Phụ thu 20-30% so với sản phẩm may sẵn. Đặt lịch hẹn đo tại cửa hàng hoặc nhân viên đến tận nơi.',
    type: 'Sản phẩm',
  },
  {
    question: 'Màu sắc thực tế có giống hình 100% không?',
    answer:
      'Hình ảnh được chụp từ sản phẩm thật, tuy nhiên màu sắc có thể chênh lệch 5-10% do ánh sáng chụp và màn hình hiển thị. Nếu khác biệt quá nhiều, bạn được đổi trả miễn phí.',
    type: 'Sản phẩm',
  },

  // Thêm về tài khoản
  {
    question: 'Có thể đổi email đăng ký không?',
    answer:
      'Có thể đổi email bằng cách liên hệ hotline với thông tin xác minh (số điện thoại, CMND). Email mới không được trùng với tài khoản khác. Lịch sử mua hàng và điểm thành viên được giữ nguyên.',
    type: 'Tài khoản',
  },
  {
    question: 'Một số điện thoại có thể đăng ký nhiều tài khoản không?',
    answer:
      'Không, mỗi số điện thoại chỉ đăng ký được một tài khoản. Điều này để đảm bảo an ninh và chống việc lạm dụng khuyến mãi. Nếu cần hỗ trợ, vui lòng liên hệ bộ phận chăm sóc khách hàng.',
    type: 'Tài khoản',
  },

  // Thêm về khuyến mãi
  {
    question: 'Có chương trình khuyến mãi vào dịp nào?',
    answer:
      'Chúng tôi có khuyến mãi đặc biệt vào các dịp: Tết Nguyên Đán, 8/3, 30/4-1/5, Quốc Khánh 2/9, Black Friday, 11/11, 12/12, Giáng Sinh. Sale up to 50% cộng thêm voucher.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Làm sao để được ưu tiên mua hàng sale sớm?',
    answer:
      'Thành viên VIP và hạng Kim Cương được "Early Access" vào sale sớm hơn 24h. Đăng ký nhận thông báo email/SMS để biết lịch sale chính xác. Follow fanpage để cập nhật flash sale bất ngờ.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Voucher bị lỗi không áp dụng được?',
    answer:
      'Kiểm tra: đã hết hạn chưa, đơn hàng đủ điều kiện chưa (giá trị tối thiểu, sản phẩm áp dụng), đã dùng hết lượt chưa. Nếu vẫn lỗi, chụp ảnh voucher và giỏ hàng gửi qua chat để được hỗ trợ.',
    type: 'Khuyến mãi',
  },

  // Thêm về chăm sóc khách hàng
  {
    question: 'Có dịch vụ tư vấn phối đồ không?',
    answer:
      'Có! Chúng tôi có stylist tư vấn miễn phí cách phối đồ phù hợp với dáng người, màu da, phong cách. Đặt lịch tư vấn qua hotline hoặc chat. Có thể tư vấn online qua video call hoặc trực tiếp tại cửa hàng.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Shop có tham gia trách nhiệm xã hội không?',
    answer:
      'Có, chúng tôi dành 1% doanh thu cho các hoạt động từ thiện, tài trợ học bổng, hỗ trợ người khuyết tật. Khách hàng có thể tham gia quyên góp quần áo cũ để tặng người nghèo.',
    type: 'Chăm sóc khách hàng',
  },

  // Thêm về đặt hàng
  {
    question: 'Đặt hàng qua app có khác gì đặt trên web không?',
    answer:
      'Đặt qua app thuận tiện hơn, nhận thông báo khuyến mãi nhanh hơn, có tính năng scan QR để tích điểm tại cửa hàng. Một số ưu đãi độc quyền chỉ dành cho app. Dữ liệu đồng bộ giữa app và web.',
    type: 'Đặt hàng',
  },
  {
    question: 'Có thể đặt hàng trước sản phẩm sắp về không?',
    answer:
      'Có, sản phẩm "Coming Soon" có thể đặt trước. Bạn đặt cọc 30%, nhận hàng và thanh toán phần còn lại khi sản phẩm về. Khách đặt trước được ưu tiên và có giá tốt hơn.',
    type: 'Đặt hàng',
  },

  // Thêm về bảo mật
  {
    question: 'Làm sao biết website này không phải web giả mạo?',
    answer:
      'Kiểm tra: URL chính xác, có icon ổ khóa SSL, giấy phép kinh doanh ở footer, số hotline trùng với fanpage chính thức, có đánh giá và feedback từ khách hàng thật. Cảnh giác với các trang giảm giá quá sốc.',
    type: 'Bảo mật',
  },
  {
    question: 'Có bị spam email quảng cáo không?',
    answer:
      'Chúng tôi chỉ gửi email về đơn hàng, khuyến mãi (nếu bạn đăng ký), và thông tin hữu ích. Không spam, không chia sẻ email cho bên thứ ba. Bạn có thể hủy đăng ký nhận email bất cứ lúc nào.',
    type: 'Bảo mật',
  },

  // Thêm về thành viên
  {
    question: 'Có cần phí để trở thành thành viên không?',
    answer:
      'KHÔNG, đăng ký thành viên hoàn toàn miễn phí. Hạng thành viên tự động được nâng cấp dựa trên giá trị mua hàng mà không cần đóng phí. Thành viên Kim Cương không mất phí duy trì.',
    type: 'Thành viên',
  },
  {
    question: 'Thẻ thành viên có dạng vật lý không?',
    answer:
      'Thành viên hạng Vàng và Kim Cương sẽ nhận thẻ vật lý gửi tận nhà miễn phí. Thẻ có mã QR để quét tích điểm tại cửa hàng và hưởng ưu đãi đặc biệt. Thẻ điện tử luôn có sẵn trên app.',
    type: 'Thành viên',
  },

  // Thêm về nước hoa
  {
    question: 'Nước hoa unisex là gì?',
    answer:
      'Nước hoa unisex là mùi hương trung tính, phù hợp cho cả nam và nữ. Thường có hương gỗ, cam chanh, xạ hương nhẹ nhàng. Xu hướng hiện đại không phân biệt giới tính trong nước hoa.',
    type: 'Nước hoa',
  },
  {
    question: 'Có thể mix nhiều loại nước hoa không?',
    answer:
      'Có thể, gọi là "layering". Mix các mùi hương có note tương đồng. Ví dụ: vanilla + gỗ đàn hương, cam bergamot + hoa nhài. Tuy nhiên cần có kiến thức về nước hoa để mix không bị đụng hương.',
    type: 'Nước hoa',
  },
  {
    question: 'Sự khác biệt giữa nước hoa và body mist?',
    answer:
      'Nước hoa nồng độ cao (10-30%), lưu hương 4-8 tiếng, giá cao. Body mist nồng độ thấp (2-5%), lưu hương 1-3 tiếng, giá rẻ, thích hợp xịt toàn thân sau khi tắm để thơm nhẹ nhàng.',
    type: 'Nước hoa',
  },

  // Thêm về chất lượng sản phẩm
  {
    question: 'Làm sao để phân biệt hàng chính hãng và hàng fake?',
    answer:
      'Hàng chính hãng có: tem nhãn rõ ràng, đường may chuẩn chỉnh, chất liệu xịn, mã QR kiểm tra xuất xứ, giá phù hợp thị trường. Tránh hàng giá rẻ bất thường. Mua tại shop uy tín có bảo hành.',
    type: 'Sản phẩm',
  },
  {
    question: 'Tiêu chuẩn sản xuất của shop là gì?',
    answer:
      'Sản phẩm tuân thủ tiêu chuẩn Việt Nam (TCVN), một số dòng đạt chuẩn quốc tế (ISO 9001). Chất liệu an toàn, không chứa hóa chất độc hại. Được kiểm định bởi bộ phận QC nghiêm ngặt.',
    type: 'Sản phẩm',
  },

  // Thêm câu hỏi tổng hợp
  {
    question: 'Shop có chương trình khách hàng thân thiết đặc biệt không?',
    answer:
      'Có! VIP Club dành cho khách hàng mua trên 20 triệu/năm với quyền lợi: giảm 15% mọi đơn hàng, miễn phí ship, ưu tiên đặt hàng mới, quà sinh nhật cao cấp, tham dự sự kiện độc quyền, stylist riêng.',
    type: 'Thành viên',
  },
  {
    question: 'Có dịch vụ sửa chữa, bảo dưỡng sản phẩm không?',
    answer:
      'Có, chúng tôi nhận sửa chữa miễn phí trong thời gian bảo hành. Sau bảo hành, nhận sửa may vải, thay dây kéo, đánh bóng giày với chi phí hợp lý. Bảo dưỡng định kỳ giúp sản phẩm bền đẹp lâu hơn.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Có chính sách cho học sinh sinh viên không?',
    answer:
      'Có! Xuất trình thẻ sinh viên được giảm 5-10% (không áp dụng đồng thời với chương trình khác). Một số sản phẩm basic dành riêng cho HSSV với giá ưu đãi. Có chương trình tài trợ đồng phục cho các câu lạc bộ.',
    type: 'Khuyến mãi',
  },
  {
    question: 'Shop có tổ chức workshop hoặc sự kiện không?',
    answer:
      'Có, định kỳ tổ chức workshop về phối đồ, chăm sóc quần áo, xu hướng thời trang. Sự kiện ra mắt bộ sưu tập mới, fashion show, meet & greet với KOL. Thành viên được tham gia miễn phí.',
    type: 'Chăm sóc khách hàng',
  },
  {
    question: 'Có dịch vụ cho thuê trang phục không?',
    answer:
      'Có, cho thuê suit, vest, đầm dạ hội cho sự kiện, đám cưới, chụp ảnh. Giá thuê 10-20% giá mua. Đặt cọc 50%, hoàn lại sau khi trả đồ. Miễn phí giặt là. Đặt trước ít nhất 3 ngày.',
    type: 'Sản phẩm',
  },
  {
    question: 'Chính sách với khách hàng doanh nghiệp như thế nào?',
    answer:
      'Hỗ trợ may đồng phục, quà tặng doanh nghiệp số lượng lớn. Giảm giá theo số lượng (50 sp: -10%, 100 sp: -15%, 200 sp: -20%). Có VAT, công nợ 30 ngày. Tư vấn thiết kế theo yêu cầu.',
    type: 'Đặt hàng',
  },
  {
    question: 'Có chương trình thu hồi quần áo cũ không?',
    answer:
      'Có! Mang quần áo cũ (bất kỳ thương hiệu nào) đến cửa hàng, nhận voucher 50.000đ cho mỗi 3 sản phẩm. Quần áo còn tốt sẽ được tặng từ thiện, hỏng nhiều sẽ tái chế làm sợi vải.',
    type: 'Chính sách đổi trả',
  },
  {
    question: 'Shop có blog chia sẻ kiến thức thời trang không?',
    answer:
      'Có, truy cập blog.shop.com để đọc các bài viết về: xu hướng thời trang, cách phối đồ, chăm sóc quần áo, bí quyết mua sắm thông minh, review sản phẩm chi tiết. Cập nhật mới hàng tuần.',
    type: 'Chăm sóc khách hàng',
  },
];
