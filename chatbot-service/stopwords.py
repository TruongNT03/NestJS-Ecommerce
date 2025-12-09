# Vietnamese Stopwords - Từ dừng tiếng Việt
# Danh sách các từ phổ biến không mang nhiều ý nghĩa trong phân tích văn bản
# Các từ đa âm được nối bằng dấu gạch dưới (_) để tương thích với sklearn

VIETNAMESE_STOPWORDS = [
    # Đại từ nhân xưng
    'tôi', 'tớ', 'mình', 'ta', 'chúng_tôi', 'chúng_ta',
    'bạn', 'cậu', 'anh', 'chị', 'em', 'ông', 'bà',
    'nó', 'họ', 'chúng', 'người_ta',
    
    # Đại từ chỉ định
    'này', 'kia', 'đó', 'ấy', 'nọ', 'đây', 'kìa',
    'đấy', 'đâu', 'nào', 'nơi', 'chỗ',
    
    # Động từ to be
    'là', 'thì', 'mà', 'nhưng', 'nhưng_mà',
    
    # Giới từ
    'của', 'cho', 'với', 'về', 'từ', 'trong', 'ngoài',
    'trên', 'dưới', 'sau', 'trước', 'giữa', 'bên',
    'để', 'đến', 'tới', 'đi', 'vào', 'ra', 'lên', 'xuống',
    'theo', 'bởi', 'bằng', 'qua', 'tại', 'ở', 'khỏi',
    'cùng', 'giống', 'như', 'tựa',
    
    # Liên từ
    'và', 'hay', 'hoặc', 'nhưng', 'mà', 'song', 'nên',
    'vì', 'do', 'bởi_vì', 'vì_vậy', 'cho_nên', 'vậy_nên',
    'tuy', 'tuy_nhiên', 'tuy_vậy', 'dù', 'dẫu',
    'nếu', 'nếu_như', 'giả_sử', 'giả_như',
    
    # Trợ từ
    'à', 'ạ', 'ơi', 'nhé', 'nha', 'ha', 'hả',
    'ư', 'ừ', 'ồ', 'ô', 'ơ', 'ấy_à',
    'vậy', 'chứ', 'cơ', 'thôi', 'đâu',
    
    # Lượng từ
    'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười',
    'mấy', 'vài', 'nhiều', 'ít', 'một_ít', 'một_vài',
    'cả', 'toàn', 'toàn_bộ', 'tất_cả', 'đủ', 'hết',
    'chút', 'tí', 'tẹo', 'xíu', 'đôi', 'vài_ba',
    
    # Phó từ
    'rất', 'lắm', 'quá', 'khá', 'hơi', 'tương_đối',
    'đã', 'sẽ', 'đang', 'vẫn', 'còn', 'chưa', 'từng',
    'cũng', 'đều', 'cùng', 'luôn', 'thường', 'hay',
    'có_thể', 'có_lẽ', 'chắc', 'chắc_chắn',
    'thật', 'thực', 'thực_sự', 'hoàn_toàn', 'hẳn',
    'chỉ', 'chỉ_có', 'chỉ_là', 'duy_nhất',
    
    # Động từ phổ biến
    'có', 'được', 'bị', 'làm', 'gì', 'như_thế_nào',
    'sao', 'thế_nào', 'ra_sao', 'thế', 'vậy',
    
    # Câu hỏi
    'gì', 'ai', 'đâu', 'nào', 'sao', 'bao_giờ', 'khi_nào',
    'như_thế_nào', 'thế_nào', 'bao_nhiêu', 'mấy',
    'làm_gì', 'tại_sao', 'vì_sao', 'tại_làm_sao',
    
    # Từ phủ định
    'không', 'chẳng', 'chả', 'không_có', 'chưa',
    'chưa_từng', 'chưa_bao_giờ', 'đừng', 'đừng_có',
    'không_được', 'không_thể', 'chẳng_thể',
    
    # Từ liên kết câu
    'thế', 'vậy', 'thế_thì', 'vậy_thì', 'như_vậy',
    'do_đó', 'vì_thế', 'vì_vậy', 'cho_nên', 'bởi_vậy',
    'tóm_lại', 'nói_chung', 'nói_tóm_lại',
    'ví_dụ', 'chẳng_hạn', 'như', 'giống_như',
    'ngoài_ra', 'thêm_nữa', 'hơn_nữa', 'thêm_vào_đó',
    
    # Từ khác
    'đây', 'đó', 'kia', 'đấy', 'ấy', 'này',
    'các', 'những', 'mọi', 'từng', 'mỗi',
    'cái', 'chiếc', 'con', 'quả', 'bộ', 'bức',
    'việc', 'chuyện', 'điều', 'sự', 'cuộc',
    'lúc', 'khi', 'hồi', 'bây_giờ', 'lúc_này',
    'ngày', 'hôm', 'tuần', 'tháng', 'năm',
    'mới', 'cũ', 'xưa', 'nay', 'giờ', 'rồi',
    
    # Từ thông dụng trong giao tiếp
    'ơi', 'này', 'nọ', 'ấy', 'ạ', 'nhé', 'nhá',
    'nha', 'nhe', 'nghe', 'ha', 'ấy_nhỉ',
    'đúng_không', 'phải_không', 'có_phải_không',
    'được_không', 'có_được_không',
    
    # Từ ngữ trong câu trần thuật
    'tức_là', 'nghĩa_là', 'có_nghĩa_là', 'tức',
    'chính_là', 'chính', 'đúng_là', 'đúng',
    'hay_là', 'hoặc_là', 'hay_không',
    
    # Từ đo lường không cụ thể
    'khoảng', 'độ', 'gần', 'xa', 'dài', 'ngắn',
    'to', 'nhỏ', 'lớn', 'bé', 'cao', 'thấp',
    
    # Từ biểu hiện thái độ
    'dạ', 'vâng', 'ừ', 'ờ', 'à', 'ô', 'ồ',
    'oa', 'ơi', 'chao', 'trời', 'ôi',
    
    # Từ nối trong văn viết
    'sau_đó', 'trước_đó', 'lúc_đó', 'khi_ấy',
    'trong_khi', 'trong_lúc', 'trong_khi_đó',
    'bên_cạnh_đó', 'song_song_đó',
    'một_mặt', 'mặt_khác',
    'đầu_tiên', 'thứ_nhất', 'thứ_hai', 'cuối_cùng',
    
    # Từ khẳng định/phủ định
    'ừ', 'ừm', 'ừa', 'ồ', 'đúng', 'đúng_rồi',
    'phải', 'phải_rồi', 'đúng_vậy', 'chính_xác',
    'không_phải', 'không_đúng', 'sai', 'sai_rồi',
    
    # Từ nhấn mạnh
    'ấy', 'nhé', 'nhá', 'đó', 'kìa', 'đấy',
    'mới', 'thật', 'thật_sự',
    'hết_sức', 'cực_kỳ', 'vô_cùng', 'cực',
    
    # Các từ viết tắt thông dụng
    'vs', 'k', 'ko', 'hok', 'dc', 'đc', 'nx', 'nữa',
    'j', 'z', 'bj', 'bik', 'biết', 'bt', 'bth',
    
    # Từ trong câu hỏi thông dụng e-commerce
    'ạ', 'dạ', 'shop', 'bên', 'bên_em', 'bên_mình',
    'ở', 'ở_đâu', 'như', 'ntn', 'thế_nào',
    
    # Từ hỏi thăm
    'thế', 'hả', 'à', 'nhỉ', 'nhể', 'nhở',
    'hở', 'ơ', 'ờ', 'ừ', 'hử', 'ủa',
    
    # Từ cảm thán
    'ôi', 'ối', 'ui', 'ủi', 'ơi', 'à_ơi',
    'trời', 'trời_ơi', 'chao_ôi', 'chà',
    
    # Từ thời gian
    'bây_giờ', 'lúc_này', 'hiện_tại', 'hiện_nay',
    'ngày_nay', 'ngày_xưa', 'trước_đây', 'sau_này',
    'lúc_trước', 'lúc_sau', 'trước_kia',
    'khi_xưa', 'lâu', 'gần_đây', 'dạo_này',
    
    # Từ bổ nghĩa không cụ thể
    'nào_đó', 'gì_đó', 'ai_đó', 'đâu_đó',
    'một_cách', 'theo_cách', 'kiểu', 'kiểu_như',
    'loại', 'thứ', 'hạng', 'dạng', 'hình_thức',
]
