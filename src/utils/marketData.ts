// 충청권 5일장 데이터
export interface MarketData {
  id: string;
  name: string;
  address: string;
  market_day: string;
  latitude: number;
  longitude: number;
  city?: string;
}

export const marketData = {
  chungnam: [
    // 천안
    { id: 'chungnam-1', name: '병천시장', address: '천안시 동남구 병천면 아우내2길 20-3', market_day: '1,6', latitude: 36.6923, longitude: 127.3183, city: '천안' },
    { id: 'chungnam-2', name: '성환이화시장', address: '천안시 서북구 성환중앙로 50', market_day: '1,6', latitude: 36.7854, longitude: 127.1547, city: '천안' },
    
    // 공주
    { id: 'chungnam-3', name: '산성시장', address: '공주시 용담길 20', market_day: '1,6', latitude: 36.4464, longitude: 127.1188, city: '공주' },
    { id: 'chungnam-4', name: '유구시장', address: '공주시 유구읍 시장길 28', market_day: '3,8', latitude: 36.3545, longitude: 127.2595, city: '공주' },
    
    // 보령
    { id: 'chungnam-5', name: '동부시장', address: '보령시 구상가길 10-1', market_day: '3,8', latitude: 36.3328, longitude: 126.6127, city: '보령' },
    { id: 'chungnam-6', name: '웅천시장', address: '보령시 웅천읍 장터4길 24', market_day: '2,7', latitude: 36.3889, longitude: 126.6547, city: '보령' },
    { id: 'chungnam-7', name: '중앙시장', address: '보령시 중앙로 97-6', market_day: '3,8', latitude: 36.3328, longitude: 126.6127, city: '보령' },
    { id: 'chungnam-8', name: '한내시장', address: '보령시 대흥로 28', market_day: '3,8', latitude: 36.3340, longitude: 126.6125, city: '보령' },
    { id: 'chungnam-9', name: '현대시장', address: '보령시 대흥로 16', market_day: '3,8', latitude: 36.3342, longitude: 126.6120, city: '보령' },
    
    // 아산
    { id: 'chungnam-10', name: '둔포전통시장', address: '아산시 둔포면 둔포면로25번길 15', market_day: '2,7', latitude: 36.7898, longitude: 126.9876, city: '아산' },
    { id: 'chungnam-11', name: '온양온천시장', address: '아산시 시장길 29', market_day: '4,9', latitude: 36.7825, longitude: 127.0073, city: '아산' },
    { id: 'chungnam-12', name: '온양온천역풍물5일장', address: '아산시 온천대로 1496', market_day: '4,9', latitude: 36.7854, longitude: 127.0089, city: '아산' },
    
    // 서산
    { id: 'chungnam-13', name: '동부전통시장', address: '서산시 시장1로 6', market_day: '2,7', latitude: 36.7847, longitude: 126.4503, city: '서산' },
    
    // 논산
    { id: 'chungnam-14', name: '화지중앙시장', address: '논산시 대화로 78', market_day: '3,8', latitude: 36.1872, longitude: 127.0985, city: '논산' },
    { id: 'chungnam-15', name: '연무안심시장', address: '논산시 연무읍 연무로166번길 7-19', market_day: '5,10', latitude: 36.1234, longitude: 127.1543, city: '논산' },
    { id: 'chungnam-16', name: '연산시장', address: '논산시 연산면 연산4길 10-7', market_day: '5,10', latitude: 36.2543, longitude: 127.2154, city: '논산' },
    
    // 당진
    { id: 'chungnam-17', name: '당진전통시장', address: '당진시 시장길 100', market_day: '5,10', latitude: 36.8934, longitude: 126.6278, city: '당진' },
    { id: 'chungnam-18', name: '신평시장', address: '당진시 신평면 금천리 385-2', market_day: '2,7', latitude: 36.8567, longitude: 126.5432, city: '당진' },
    { id: 'chungnam-19', name: '합덕전통시장', address: '당진시 합덕읍 버그내2길 128-25', market_day: '1,6', latitude: 36.9123, longitude: 126.6789, city: '당진' },
    
    // 금산
    { id: 'chungnam-20', name: '금산시장', address: '금산군 금산읍 건삼전길 11', market_day: '2,7', latitude: 36.1089, longitude: 127.4876, city: '금산' },
    { id: 'chungnam-21', name: '마전시장', address: '금산군 추부면 하마전로 9', market_day: '4,9', latitude: 36.1456, longitude: 127.3254, city: '금산' },
    
    // 부여
    { id: 'chungnam-22', name: '부여시장', address: '부여군 부여읍 성왕로 173번길 12', market_day: '5,10', latitude: 36.2756, longitude: 126.9099, city: '부여' },
    { id: 'chungnam-23', name: '외산시장', address: '부여군 외산면 외산로 106-10', market_day: '4,9', latitude: 36.3234, longitude: 126.8876, city: '부여' },
    { id: 'chungnam-24', name: '은산시장', address: '부여군 은산면 충의로 680', market_day: '1,6', latitude: 36.2987, longitude: 126.8543, city: '부여' },
    { id: 'chungnam-25', name: '홍산시장', address: '부여군 홍산면 홍산시장로 43-3', market_day: '2,7', latitude: 36.3456, longitude: 126.7890, city: '부여' },
    
    // 서천
    { id: 'chungnam-26', name: '판교시장', address: '서천군 판교면 종판로 887번길 26-8', market_day: '5,10', latitude: 36.2134, longitude: 126.8123, city: '서천' },
    { id: 'chungnam-27', name: '한산시장', address: '서천군 한산면 충절로 1173번길 22', market_day: '1,6', latitude: 36.1987, longitude: 126.7654, city: '서천' },
    { id: 'chungnam-28', name: '비인시장', address: '서천군 비인면 비인로 149번길 12', market_day: '4,9', latitude: 36.1765, longitude: 126.7321, city: '서천' },
    
    // 청양
    { id: 'chungnam-29', name: '정산시장', address: '청양군 정산면 서정리 162', market_day: '5,10', latitude: 36.4123, longitude: 126.7890, city: '청양' },
    { id: 'chungnam-30', name: '청양시장', address: '청양군 청양읍 읍내리 196-4', market_day: '2,7', latitude: 36.4567, longitude: 126.8012, city: '청양' },
    
    // 홍성
    { id: 'chungnam-31', name: '갈산전통시장', address: '홍성군 갈산면 갈산로 120번길 10', market_day: '3,8', latitude: 36.5432, longitude: 126.6789, city: '홍성' },
    { id: 'chungnam-32', name: '광천전통시장', address: '홍성군 광천읍 광천1길 45', market_day: '4,9', latitude: 36.5123, longitude: 126.7234, city: '홍성' },
    { id: 'chungnam-33', name: '홍성전통시장', address: '홍성군 홍성읍 홍성천길 242', market_day: '1,6', latitude: 36.6012, longitude: 126.6654, city: '홍성' },
    
    // 예산
    { id: 'chungnam-34', name: '고덕시장', address: '예산군 고덕면 대천3길 30', market_day: '3,8', latitude: 36.6789, longitude: 126.8234, city: '예산' },
    { id: 'chungnam-35', name: '광시시장', address: '예산군 광시면 광시소길 8', market_day: '3,8', latitude: 36.7123, longitude: 126.8567, city: '예산' },
    { id: 'chungnam-36', name: '덕산시장', address: '예산군 덕산면 읍내북문 14-1', market_day: '4,9', latitude: 36.7456, longitude: 126.8890, city: '예산' },
    { id: 'chungnam-37', name: '삽교시장', address: '예산군 삽교읍 두리2길 57-1', market_day: '2,7', latitude: 36.7789, longitude: 126.9123, city: '예산' },
    { id: 'chungnam-38', name: '역전시장', address: '예산군 예산읍 역전로 84', market_day: '3,8', latitude: 36.6834, longitude: 126.8456, city: '예산' },
    { id: 'chungnam-39', name: '예산시장', address: '예산군 예산읍 예산리 346-13', market_day: '5,10', latitude: 36.6812, longitude: 126.8478, city: '예산' }
  ],
  
  chungbuk: [
    // 청주
    { id: 'chungbuk-1', name: '밤고개자연시장', address: '내덕동 398-4', market_day: '2,7', latitude: 36.6387, longitude: 127.4896, city: '청주' },
    { id: 'chungbuk-2', name: '육거리종합시장', address: '석교동 63-1', market_day: '2,7', latitude: 36.6234, longitude: 127.4567, city: '청주' },
    { id: 'chungbuk-3', name: '내수전통시장', address: '내수읍 내수로 726', market_day: '5,10', latitude: 36.7123, longitude: 127.3456, city: '청주' },
    { id: 'chungbuk-4', name: '오창전통시장', address: '오창면 장대리 294', market_day: '3,8', latitude: 36.7456, longitude: 127.3789, city: '청주' },
    
    // 충주
    { id: 'chungbuk-5', name: '자유시장', address: '충인6길 16(충의동)', market_day: '5,10', latitude: 36.9910, longitude: 127.9254, city: '충주' },
    { id: 'chungbuk-6', name: '연원시장', address: '금곡로 31(연수동)', market_day: '4,9', latitude: 36.9723, longitude: 127.9456, city: '충주' },
    { id: 'chungbuk-7', name: '엄정내창시장', address: '엄정면 엄정내창로 191-1', market_day: '3,8', latitude: 37.0123, longitude: 127.8789, city: '충주' },
    { id: 'chungbuk-8', name: '목행시장', address: '행정7길 26(목행동)', market_day: '2,7', latitude: 36.9834, longitude: 127.9123, city: '충주' },
    
    // 제천
    { id: 'chungbuk-9', name: '역전한마음', address: '내토로28길12(화산동)', market_day: '3,8', latitude: 37.1323, longitude: 128.1945, city: '제천' },
    { id: 'chungbuk-10', name: '덕산시장', address: '덕산면 약초로3안길5-1', market_day: '4,9', latitude: 37.1456, longitude: 128.2234, city: '제천' },
    { id: 'chungbuk-11', name: '박달재전통시장', address: '백운면 평동로2길13', market_day: '1,6', latitude: 37.1789, longitude: 128.2567, city: '제천' },
    
    // 보은
    { id: 'chungbuk-12', name: '보은전통시장', address: '보은읍 삼산로 17,16', market_day: '1,6', latitude: 36.4892, longitude: 127.7345, city: '보은' },
    { id: 'chungbuk-13', name: '결초보은시장', address: '보은읍 삼산로 3길 8', market_day: '1,6', latitude: 36.4923, longitude: 127.7378, city: '보은' },
    
    // 영동
    { id: 'chungbuk-14', name: '영동중앙시장', address: '영동읍 계산리 693-27', market_day: '4,9', latitude: 36.1756, longitude: 127.7823, city: '영동' },
    { id: 'chungbuk-15', name: '영동전통시장', address: '영동읍 계산리 694-13', market_day: '4,9', latitude: 36.1789, longitude: 127.7845, city: '영동' },
    
    // 증평
    { id: 'chungbuk-16', name: '증평장뜰시장', address: '증평읍 장뜰로 58-1', market_day: '1,6', latitude: 36.7823, longitude: 127.5934, city: '증평' },
    
    // 진천
    { id: 'chungbuk-17', name: '운수대통!생거진천전통시장', address: '진천읍 원덕로 390', market_day: '5,10', latitude: 36.8567, longitude: 127.4323, city: '진천' },
    { id: 'chungbuk-18', name: '진천중앙시장', address: '진천읍 중앙동6길', market_day: '5,10', latitude: 36.8598, longitude: 127.4356, city: '진천' },
    
    // 괴산
    { id: 'chungbuk-19', name: '괴산전통시장', address: '괴산읍 읍내로 15길 8-8', market_day: '3,8', latitude: 36.8123, longitude: 127.7890, city: '괴산' },
    { id: 'chungbuk-20', name: '목도시장', address: '불정면 목도로4길 11', market_day: '4,9', latitude: 36.8456, longitude: 127.8123, city: '괴산' },
    { id: 'chungbuk-21', name: '연풍시장', address: '연풍면 향교로 홍문길 5-1', market_day: '2,7', latitude: 36.8789, longitude: 127.8456, city: '괴산' },
    { id: 'chungbuk-22', name: '청천시장', address: '괴산군 청천면 청천2길10', market_day: '5,10', latitude: 36.9012, longitude: 127.8789, city: '괴산' },
    
    // 음성
    { id: 'chungbuk-23', name: '음성시장', address: '시장로 117번길 6', market_day: '2,7', latitude: 36.9345, longitude: 127.6890, city: '음성' },
    { id: 'chungbuk-24', name: '무극시장', address: '무극로 308번길', market_day: '5,10', latitude: 36.9567, longitude: 127.7123, city: '음성' },
    { id: 'chungbuk-25', name: '대소시장', address: '오태로 104', market_day: '3,8', latitude: 36.9789, longitude: 127.7456, city: '음성' },
    { id: 'chungbuk-26', name: '삼성시장', address: '대성로 615', market_day: '1,6', latitude: 36.9234, longitude: 127.6789, city: '음성' },
    { id: 'chungbuk-27', name: '감곡시장', address: '장감로 132번길 22', market_day: '3,8', latitude: 36.9456, longitude: 127.7012, city: '음성' },
    
    // 단양
    { id: 'chungbuk-28', name: '단양구경시장', address: '단양읍 도전5길 31', market_day: '1,6', latitude: 36.9823, longitude: 128.3654, city: '단양' },
    { id: 'chungbuk-29', name: '매포전통시장', address: '매포읍 평동24길 8', market_day: '4,9', latitude: 37.0123, longitude: 128.3987, city: '단양' }
  ],
  
  sejong: [
    { id: 'sejong-1', name: '세종대평시장', address: '금남면대평시장1길17-2', market_day: '2,7', latitude: 36.4801, longitude: 127.2890 },
    { id: 'sejong-2', name: '전의왕의물시장', address: '전의면장터길33', market_day: '2,7', latitude: 36.3845, longitude: 127.3521 },
    { id: 'sejong-3', name: '세종전통시장', address: '조치원읍조치원8길42', market_day: '4,9', latitude: 36.5885, longitude: 127.2890 },
    { id: 'sejong-4', name: '부강전통시장', address: '부강면부강5길18', market_day: '5,10', latitude: 36.4177, longitude: 127.3965 }
  ],
  
  daejeon: [
    { id: 'daejeon-1', name: '유성시장', address: '대전 유성구 유성대로730번길 24', market_day: '4,9', latitude: 36.3398, longitude: 127.3940 },
    { id: 'daejeon-2', name: '신탄진시장', address: '대전광역시 대덕구 석봉로43번길 37', market_day: '3,8', latitude: 36.4366, longitude: 127.4304 }
  ]
};