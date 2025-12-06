"""
Spell correction and fuzzy matching for Vietnamese text
Xử lý lỗi chính tả và tìm kiếm mờ cho tiếng Việt
"""

from fuzzywuzzy import fuzz, process
import re

# Common Vietnamese typos mapping
COMMON_TYPOS = {
    # Thường gặp khi gõ nhanh
    'ko': 'không',
    'k': 'không',
    'dc': 'được',
    'đc': 'được',
    'vs': 'với',
    'ntn': 'như thế nào',
    'tks': 'cảm ơn',
    'thanks': 'cảm ơn',
    'cx': 'cũng',
    'j': 'gì',
    'z': 'vậy',
    'nv': 'nhân viên',
    'sp': 'sản phẩm',
    'kh': 'khách hàng',
    'nt': 'nhắn tin',
    'sdt': 'số điện thoại',
    'đh': 'đơn hàng',
    'vc': 'vận chuyển',
    'tt': 'thanh toán',
    'bh': 'bảo hành',
    'km': 'khuyến mãi',
    'mgg': 'mã giảm giá',
    'mn': 'mọi người',
    'ng': 'người',
    'ngu': 'người',
    'mk': 'mình',
    'ck': 'chuyển khoản',
    'bn': 'bạn',
    'tui': 'tôi',
    'mik': 'mình',
    
    # Lỗi bỏ dấu
    'hang': 'hàng',
    'tien': 'tiền',
    'don': 'đơn',
    'dang': 'đang',
    'duoc': 'được',
    'khong': 'không',
    'nhan': 'nhận',
    'nhu': 'như',
    'may': 'mấy',
    'la': 'là',
    'co': 'có',
    'cua': 'của',
    'de': 'để',
    'den': 'đến',
    
    # Lỗi đánh máy phổ biến
    'shopp': 'shop',
    'shợp': 'shop',
    'shp': 'shop',
    'sản phâm': 'sản phẩm',
    'sản phẩmm': 'sản phẩm',
    'dổi': 'đổi',
    'dooi': 'đổi',
    'trả': 'trả',
    'traa': 'trả',
    'giáo': 'giao',
    'giaoo': 'giao',
    'thanh toan': 'thanh toán',
    'van chuyen': 'vận chuyển',
    'bao laau': 'bao lâu',
    'bao lau': 'bao lâu',
    'nao': 'nào',
    'lam sao': 'làm sao',
    'the nao': 'thế nào',
    'nhu the nao': 'như thế nao',
    'gia': 'giá',
    'phi': 'phí',
}

def fix_common_typos(text):
    """
    Sửa các lỗi chính tả phổ biến
    
    Args:
        text (str): Text cần sửa
        
    Returns:
        str: Text đã được sửa
    """
    words = text.lower().split()
    fixed_words = []
    
    for word in words:
        # Kiểm tra trong dictionary lỗi phổ biến
        if word in COMMON_TYPOS:
            fixed_words.append(COMMON_TYPOS[word])
        else:
            fixed_words.append(word)
    
    return ' '.join(fixed_words)

def normalize_question(text):
    """
    Chuẩn hóa câu hỏi: lowercase, remove extra spaces, fix typos
    
    Args:
        text (str): Câu hỏi gốc
        
    Returns:
        str: Câu hỏi đã được chuẩn hóa
    """
    # Lowercase
    text = text.lower().strip()
    
    # Loại bỏ khoảng trắng liên tục và xuống dòng
    text = re.sub(r'\s+', ' ', text)
    
    # Fix common typos
    text = fix_common_typos(text)
    
    # Remove special characters except Vietnamese
    text = re.sub(r"[^a-z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệ"
                  r"íìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữự"
                  r"ýỳỷỹỵđ\s?]", " ", text)
    
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def fuzzy_match_question(query, questions, threshold=70):
    """
    Tìm câu hỏi gần giống nhất sử dụng fuzzy matching
    
    Args:
        query (str): Câu hỏi cần tìm, đã được chuẩn hóa ở bước trước
        questions (list): Danh sách các câu hỏi trong database
        threshold (int): Ngưỡng độ tương đồng (0-100)
        
    Returns:
        tuple: (best_match, score) hoặc (None, 0)
    """

    # Normalize all questions
    normalized_questions = [normalize_question(q) for q in questions]
    
    # Find best match using different fuzzy matching strategies
    best_match = None
    best_score = 0
    best_index = -1
    
    for i, q in enumerate(normalized_questions):
        # Token sort ratio - good for word order variations
        score1 = fuzz.token_sort_ratio(query, q)
        
        # Token set ratio - good for subset matching
        score2 = fuzz.token_set_ratio(query, q)
        
        # Partial ratio - good for substring matching
        score3 = fuzz.partial_ratio(query, q)
        
        # Take the maximum score
        score = max(score1, score2, score3)
        
        if score > best_score:
            best_score = score
            best_match = questions[i]  # Return original question
            best_index = i
    
    if best_score >= threshold:
        return best_match, best_score, best_index
    
    return None, 0, -1

def get_alternative_keywords(text):
    """
    Lấy các từ khóa thay thế cho việc search
    
    Args:
        text (str): Text gốc
        
    Returns:
        list: Danh sách các từ khóa thay thế
    """
    alternatives = []
    
    # Mapping các từ đồng nghĩa
    synonyms = {
        'mua': ['đặt', 'order', 'đặt hàng', 'mua hàng'],
        'thanh toán': ['trả tiền', 'payment', 'pay', 'trả'],
        'giao hàng': ['ship', 'vận chuyển', 'giao', 'nhận hàng'],
        'đổi': ['thay', 'đổi trả', 'trả', 'return'],
        'hủy': ['cancel', 'hủy bỏ', 'không lấy'],
        'giá': ['giá cả', 'bao nhiêu', 'cost', 'tiền'],
        'shop': ['cửa hàng', 'store', 'bên mình', 'bên em'],
        'sản phẩm': ['hàng', 'đồ', 'món', 'sp'],
        'nhanh': ['gấp', 'speed', 'tốc độ', 'nhanh chóng'],
        'chậm': ['lâu', 'slow', 'delay', 'trễ'],
    }
    
    words = text.lower().split()
    
    for word in words:
        if word in synonyms:
            alternatives.extend(synonyms[word])
    
    return alternatives

def enhance_query_with_corrections(query):
    """
    Tăng cường query bằng cách thêm các từ đã sửa lỗi
    
    Args:
        query (str): Query gốc
        
    Returns:
        str: Query đã được tăng cường
    """
    normalized = normalize_question(query)
    alternatives = get_alternative_keywords(normalized)
    
    # Combine original and alternatives
    enhanced = normalized
    if alternatives:
        enhanced += ' ' + ' '.join(alternatives)
    
    return enhanced
