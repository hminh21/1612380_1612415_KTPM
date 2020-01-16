const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';

const Product = require('./models/product');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');
const Customer = require('./models/customer');
const Order = require('./models/order');
const Admin = require('./models/admin');
const productDao = require('./models/dao/productDao');

mongoose.connect(mongoDB, function(error){
    if(error)
        throw error;

    console.log('Successfully connected');
    //Tạo phân loại
    //IC
    let mvcCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: 'IC',
        isDeleted: 0
    });

    mvcCategory.save(function (error) {
        if(error) throw error;
    });

    const IC = mvcCategory._id;

    //TF
    mvcCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: 'TF',
        isDeleted: 0
    });

    mvcCategory.save(function (error) {
        if(error) throw error;
    });
    const TF = mvcCategory._id;

    //FG
    mvcCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: 'FG',
        isDeleted: 0
    });
    const FG = mvcCategory._id;

    mvcCategory.save(function (error) {
        if(error) throw error;
    });


    //Tạo NSX
    //Pan
    let mvcManufacturer = new Manufacturer({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan',
        isDeleted: 0,
        img: '/img/Pan.jpg'
    });

    mvcManufacturer.save(function(error){
        if(error) throw error;
    });
    const Pan = mvcManufacturer._id;

    //Adidas
    mvcManufacturer = new Manufacturer({
        _id: new mongoose.Types.ObjectId(),
        name: 'Adidas',
        isDeleted: 0,
        img: '/img/Adidas.png'
    });

    mvcManufacturer.save(function(error){
        if(error) throw error;
    });
    const Adidas = mvcManufacturer._id;

    //Nike
    mvcManufacturer = new Manufacturer({
        _id: new mongoose.Types.ObjectId(),
        name: 'Nike',
        isDeleted: 0,
        img: '/img/Nike.jpg'
    });

    mvcManufacturer.save(function(error){
        if(error) throw error;
    });
    const Nike = mvcManufacturer._id;

    //Tạo SP
    let mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan Balancer Touch X TF (Đỏ)',
        manufacturer: Pan,
        category: TF,
        img: 'img/Pan-Balancer-Touch-X-TF-(Đỏ).jpg',
        price: 640000,
        status: true,
        info:'Giày Futsal Pan Balancer Touch X là dòng giày thuộc phân khúc trung cấp của hãng Pan Thái Lan. Đây là một trong các sản phẩm giày đá banh có thiết kế đột phá hơn so với các sản phẩm được hãng sản xuất trước đó. Phần upper giày Pan Balancer Touch X được thiết kế với công nghệ Dynamic Skin tạo nên lớp da mềm mại và rất ôm chân hỗ trợ kiểm soát bóng, giúp cảm giác bóng chân thật hơn. Thêm vào đó là trọng lượng giày khá nhẹ kết hợp với phần Fit collar, nối liền thân giày với lưỡi gà nhằm hạn chế xô dịch lưỡi gà khi di chuyển cũng như đem lại sự vừa vặn và ôm chân tốt hơn. Phần đế được thiết kế từ chất liệu cao su tự nhiên cao cấp gồm nhiều đinh nhỏ hình lục giác có độ cao vừa phải sẽ tạo độ bám và ma sát tốt với bề mặt tiếp xúc, tránh trơn trượt ngay cả khi bạn chạy trên sân cỏ; đồng thời hỗ trợ tuyệt vời cho những pha xử lý bóng bằng gầm giầy, những cú ngoặt bóng siêu nhanh.\n' +
            'Chất liệu: \n' +
            '- Thân giày là da tổng hợp cao cấp với công nghệ Dynamic Skin tạo nên lớp da mềm, mỏng nhẹ, chống thấm sơ.\n' +
            '- Cổ giày là chất liệu thun, không quá cao và dễ mang.\n' +
            '- Đế giày là cao su chất lượng cao. Form giày hơi ngang, chắc chắn, độ cao đế vừa phải, hỗ trợ kéo, kiểm soát banh tốt nhất.\n' +
            'Xuất xứ: Pan Thái Lan Chính Hãng.\n' +
            'Sử dụng: Chuyên đá sân cỏ nhân tạo mini (5,7 người).\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-05-01'),
        viewed: 20,
        sale: 25
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan Balancer Touch X TF (Đen)',
        manufacturer: Pan,
        category: TF,
        img: 'img/Pan-Balancer-Touch-X-TF-(Đen).jpg',
        price: 640000,
        status: true,
        info:'Giày Futsal Pan Balancer Touch X là dòng giày thuộc phân khúc trung cấp của hãng Pan Thái Lan. Đây là một trong các sản phẩm giày đá banh có thiết kế đột phá hơn so với các sản phẩm được hãng sản xuất trước đó. Phần upper giày Pan Balancer Touch X được thiết kế với công nghệ Dynamic Skin tạo nên lớp da mềm mại và rất ôm chân hỗ trợ kiểm soát bóng, giúp cảm giác bóng chân thật hơn. Thêm vào đó là trọng lượng giày khá nhẹ kết hợp với phần Fit collar, nối liền thân giày với lưỡi gà nhằm hạn chế xô dịch lưỡi gà khi di chuyển cũng như đem lại sự vừa vặn và ôm chân tốt hơn. Phần đế được thiết kế từ chất liệu cao su tự nhiên cao cấp gồm nhiều đinh nhỏ hình lục giác có độ cao vừa phải sẽ tạo độ bám và ma sát tốt với bề mặt tiếp xúc, tránh trơn trượt ngay cả khi bạn chạy trên sân cỏ; đồng thời hỗ trợ tuyệt vời cho những pha xử lý bóng bằng gầm giầy, những cú ngoặt bóng siêu nhanh.\n' +
            'Chất liệu: \n' +
            '- Thân giày là da tổng hợp cao cấp với công nghệ Dynamic Skin tạo nên lớp da mềm, mỏng nhẹ, chống thấm sơ.\n' +
            '- Cổ giày là chất liệu thun, không quá cao và dễ mang.\n' +
            '- Đế giày là cao su chất lượng cao. Form giày hơi ngang, chắc chắn, độ cao đế vừa phải, hỗ trợ kéo, kiểm soát banh tốt nhất.\n' +
            'Xuất xứ: Pan Thái Lan Chính Hãng.\n' +
            'Sử dụng: Chuyên đá sân cỏ nhân tạo mini (5,7 người).\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-05-02'),
        viewed: 50,
        sale: 35
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan Vigor 8 IC (Cam)',
        manufacturer: Pan,
        category: IC,
        img: 'img/Pan-Vigor-8-IC-(Cam).jpg',
        price: 460000,
        status: true,
        info: 'Giày Futsal Vigor 8 IC là một trong những sản phẩm mới thuộc phân khúc tầm trung được Pan Thailand ra mắt trong năm 2019. Vẫn là kiểu dáng chuẩn của dòng Vigor, kế thừa những ưu điểm của các dòng Pan Vigor 6, Pan Vigor 7, Pan Vigor 7.1, Pan Vigor Zero,... kết hợp với chất liệu nhẹ, ôm gọn chân và tạo cảm giác rất linh hoạt khi di chuyển. Phiên bản lần này được thiết kế đơn giản với chất liệu da tổng hợp gồm các họa tiết dập nổi ở phần thân giày tạo độ ma sát lớn giúp việc kiểm soát bóng dễ dàng hơn. Bên cạnh đó, phần đế làm từ cao su tổng hợp khá mềm, được bố trí vân tròn hỗ trợ xoay chuyển, đường sóng và các ô cao su có hình dạng khác nhau tạo sự cân bằng, tạo độ bám khi di chuyển hoặc bứt tốc theo các hướng khác nhau.\n' +
            '\n' +
            'Chất liệu: \n' +
            '- Thân giày là Simili cao cấp, thân giày có thiết kế hoạ tiết 3D chìm ở phần thân giày tạo nên tác phẩm vô cùng nghệ thuật.\n' +
            '- Đế giày là cao su chất lượng cao, có độ co giãn, dẻo với nhiều mảng màu giúp các động tác chân được linh hoạt nhất.\n' +
            '- Form giày hơi ngang, chắc chắn, độ cao đế vừa phải, hỗ trợ kéo, kiểm soát banh tốt nhất.\n' +
            'Xuất xứ: Pan Thái Lan Chính Hãng.\n' +
            'Sử dụng: Chuyên đá Futsal trong nhà, sân gỗ. Sân cỏ nhân tạo mini (5,7 người), sân xi măng và các môn thể thao trong nhà khác.\n' +
            'Màu: Hiện có nhiều phiên bản màu.\n' +
            'Size: 38 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-04-01'),
        viewed: 23,
        sale: 30
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan Vigor 8 IC (Dạ)',
        manufacturer: Pan,
        category: IC,
        img: 'img/Pan-Vigor-8-IC-(Dạ).jpg',
        price: 460000,
        status: true,
        info: 'Giày Futsal Vigor 8 IC là một trong những sản phẩm mới thuộc phân khúc tầm trung được Pan Thailand ra mắt trong năm 2019. Vẫn là kiểu dáng chuẩn của dòng Vigor, kế thừa những ưu điểm của các dòng Pan Vigor 6, Pan Vigor 7, Pan Vigor 7.1, Pan Vigor Zero,... kết hợp với chất liệu nhẹ, ôm gọn chân và tạo cảm giác rất linh hoạt khi di chuyển. Phiên bản lần này được thiết kế đơn giản với chất liệu da tổng hợp gồm các họa tiết dập nổi ở phần thân giày tạo độ ma sát lớn giúp việc kiểm soát bóng dễ dàng hơn. Bên cạnh đó, phần đế làm từ cao su tổng hợp khá mềm, được bố trí vân tròn hỗ trợ xoay chuyển, đường sóng và các ô cao su có hình dạng khác nhau tạo sự cân bằng, tạo độ bám khi di chuyển hoặc bứt tốc theo các hướng khác nhau.\n' +
            '\n' +
            'Chất liệu: \n' +
            '- Thân giày là Simili cao cấp, thân giày có thiết kế hoạ tiết 3D chìm ở phần thân giày tạo nên tác phẩm vô cùng nghệ thuật.\n' +
            '- Đế giày là cao su chất lượng cao, có độ co giãn, dẻo với nhiều mảng màu giúp các động tác chân được linh hoạt nhất.\n' +
            '- Form giày hơi ngang, chắc chắn, độ cao đế vừa phải, hỗ trợ kéo, kiểm soát banh tốt nhất.\n' +
            'Xuất xứ: Pan Thái Lan Chính Hãng.\n' +
            'Sử dụng: Chuyên đá Futsal trong nhà, sân gỗ. Sân cỏ nhân tạo mini (5,7 người), sân xi măng và các môn thể thao trong nhà khác.\n' +
            'Màu: Hiện có nhiều phiên bản màu.\n' +
            'Size: 38 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-04-15'),
        viewed: 15,
        sale: 20
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Nike Mercurial Victory 5 FG (Hồng đen)',
        manufacturer: Nike,
        category: FG,
        img: 'img/Nike-Mercurial-Victory-5-FG-(Hồng-đen).jpg',
        price: 1290000,
        status: true,
        info: 'Giày Nike Mercurial có thiết kế ôm chân cảm giác bóng tốt, khối lượng tương đối nhẹ. Là sản phầm phù hợp cho các cầu thủ đam mê tốc độ.\n' +
            '\n' +
            'Chất liệu:\n' +
            '- Thân giày là chất liệu tổng hợp cao cấp, bề mặt nhám giúp bám banh tốt hơn, hỗ trợ kĩ thuật. \n' +
            '- Đế giày là chất liệu nhựa Plastic, kiểu FG phù hợp chơi bóng trên sân cỏ tự nhiên. \n' +
            'Xuất xứ: Giày Nike Chính Hãng. Fullbox. Mã giày: 651632-660\n' +
            'Sử dụng: Chuyên đá sân cỏ tự nhiên.\n' +
            'Màu: Hiện có 1 phiên bản màu\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-03-02'),
        viewed: 40,
        sale: 37
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Nike Hypervenom FG (Biển cam)',
        manufacturer: Nike,
        category: FG,
        img: 'img/Nike-Hypervenom-FG-(Biển-cam).jpg',
        price: 990000,
        status: true,
        info: 'Dòng Nike Hypervenom I II là cũng là 1 dòng chủ lực của Nike Soccer. Nổi bật với kiểu dáng không quá ôm, thấp và nhẹ hỗ trợ kiểm soát tốt cho các tuyển thủ.\n' +
            '\n' +
            'Chất liệu: Thân giày là Simili, mềm, mỏng, nhẹ, chống thấm sơ. \n' +
            'Đế giày là cao su chất lượng. Form giày hơi bè, thấp, hỗ trợ kéo, kiểm soát banh tốt nhất.\n' +
            'Xuất xứ: Hàng chính hãng Fullbox. Mã giày: 599730-484\n' +
            'Sử dụng: Chuyên đá sân cỏ tự nhiên 11 người.\n' +
            'Màu: Hiện có 1 phiên bản màu.\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-02-22'),
        viewed: 75,
        sale: 14
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Adidas X 16.3 TF (Trắng đồng)',
        manufacturer: Adidas,
        category: TF,
        img: 'img/Adidas-X-16.3-TF-(Trắng-đồng).jpg',
        price: 1650000,
        status: true,
        info: 'Giày Adidas X 16.3 nằm trong bộ sưu tập Stellar Pack được ra mắt vào tháng 7/2016 của hãng Adidas. Với trọng lượng nhẹ, giày được xem là giày bóng đá tốc độ- speed boot của dòng Football X cũng như là dòng giày chủ đạo của hãng. Phiên bản lần này vẫn là chất liệu da tổng hợp, vẫn giữ nguyên form dáng của dòng X 16 và phần cổ cao đặc trưng nhưng phần thân giày được thiết kế lại với họa tiết độc đáo nhằm mang đến diện mạo mới mẻ cho giày. Phần lưỡi gà là chất liệu thun nối liền với phần cổ giày nhằm cố định phần lưỡi gà hạn chế vấn đề xô dịch lưỡi gà khi di chuyển và phần cổ giày không quá cao giúp bảo vệ vùng mắt cá chân, hạn chế các chấn thương không đáng có. Ngoài ra, công nghệ Techfit kết hợp với phần trong thân giày là một lớp layer dạng sợi nên giày có độ ôm chân, loại bỏ mọi khoảng trống giữa chân và giày giúp cầu thủ tự tin chơi bóng. Bên cạnh đó, mặt đế được thiết kế với các khối đinh thấp và có kích thước khác nhau nhằm tăng khả năng ma sát với bề mặt sân giúp cho các tình huống tranh chấp trở nên vững chắc và không bị trơn trượt. \n' +
            '\n' +
            'Chất liệu: \n' +
            '- Thân giày là chất liệu da tổng hợp ít chắp vá, mỏng, nhẹ, bền. \n' +
            '- Phần lưỡi gà là chất liệu thun được phủ một lớp firm mỏng nhằm tăng độ bền nối liền với cổ giày.\n' +
            '- Cổ giày là thun co dãn, không quá cao và dễ mang. \n' +
            '- Form giày ôm vừa phải, chắc chắn, độ cao đế thấp, kiểm soát banh và tăng tốc nhanh nhất.\n' +
            'Xuất xứ: VNXK, Chính Hãng, Real. Mã sản phẩm: ART AQ4352\n' +
            'Sử dụng: Sân cỏ nhân tạo mini (5,7 người). Hỗ trợ kiểm soát bóng, chuộng kĩ thuật.\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-05-19'),
        viewed: 10,
        sale: 5,
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Adidas Copa Tango 17.1 IC (Đen)',
        manufacturer: Adidas,
        category: IC,
        img: 'img/Adidas-Copa-Tango-17.1-IC-(Đen).jpg',
        price: 1790000,
        status: true,
        info: 'Giày Adidas Copa Tango 17.1 là một trong những thế hệ tiếp nối của dòng Copa và vừa được hãng Adidas ra mắt vào tháng 11/2016. Giày được thiết kế với bề mặt da Kangaroo cho nửa trên thân giày mang lại cảm giác mềm mại, thoải mái cho đôi chân và có thể cảm nhận được sự khác biệt khi lần đầu chạm vào. Phần gót là da tổng hợp và phần lưỡi gà được sử dụng chất liệu vải lưới có độ co dãn, một phần dính liền với phần đế cũng như được thiết kế dài hơn những phiên bản trước giúp giữ ổn định, hạn chế xô dịch lưỡi gà khi di chuyển và bảo vệ tối đa cho bàn chân. Ngoài ra, phần mũi giày được bao bọc xung quanh bởi một lớp da Simili chồng lên trên bảo vệ các đầu ngón chấn khi sút bóng hoặc tranh chấp bóng đồng thời tạo độ chắc chắn và tăng tuổi thọ cho giày, hạn chế bong tróc ở phần mũi. Phần đế giày có hình dạng hai lớp đế do được tăng cường thêm bộ đệm Boost có khả năng đàn hồi cực tốt và mặt đế được bố trí các xoáy tròn có dạng lục giác phía trên để kết nối các rãnh hình thoi nhằm tăng khả năng xoay chuyển, tạo độ bám sân khi chạy và bức tốc.\n' +
            '\n' +
            'Chất liệu: \n' +
            '- Thân giày là chất liệu da Kangaroo kết hợp với nửa sau là da tổng hợp mỏng, nhẹ, bền. \n' +
            '- Phần lưỡi gà là chất liệu lưới có khả năng co dãn và được thiết kế dài hơn truyền thống.   \n' +
            '- Đế giày là màu cao su nguyên bản. Đế IC futsal indoor.\n' +
            '- Form giày ôm vừa phải, chắc chắn, độ cao đế thấp, kiểm soát banh và tăng tốc nhanh nhất.\n' +
            'Xuất xứ: VNXK, Chính Hãng, Real. Mã sản phẩm: ART BB2676\n' +
            'Sử dụng: Sân Futsal, Indoor, sân xi măng, sân cỏ nhân tạo mini (5,7 người). Hỗ trợ kiểm soát bóng, chuộng kĩ thuật.\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-05-07'),
        viewed: 15,
        sale: 27
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Adidas Nemeziz 18.3 FG SF (Biển đỏ)',
        manufacturer: Adidas,
        category: FG,
        img: 'img/Adidas-Nemeziz-18.3-FG-SF-(Biển-đỏ).jpg',
        price: 540000,
        status: true,
        info: 'Giày Adidas Messi Nemeziz Tango 18.3 là giày đá banh sân cỏ tự nhiên thế hệ mới mang lại cảm giác ôm chân và thoải mái nhất từ trước tới nay của Adidas được ra mắt trong năm 2018. Toàn bộ thân giày được thiết kế vô cùng bắt mắt, đồng thời ở phiên bản mới này, phần thân giày sử dụng chất liệu da tổng hợp kiểu mới cực kì ôm chân, phần lưỡi gà được tối giản thành một khối liền mạch, giúp tăng cảm giác bóng, hỗ trợ xử lý bóng tốt hơn. Phần cổ giày khi mang không có cảm giác khó căng tức. Đồng thời, trọng lượng giày được giảm thiểu hơn so với các phiên bản tiền nhiệm và hệ thống đinh giày được bố trí rất  khoa học nhằm hỗ trợ xoay chuyển, giữ thăng bằng và bức tốc tốt.\n' +
            '\n' +
            'Chất liệu:\n' +
            '- Thân giày là simili cao cấp, chống thấm sơ, mềm, mịn, đàn hồi. Thân giày nguyên mảng, liền mạch không chấp vá làm tăng cảm giác bóng và kiểm soát. \n' +
            '- Đinh giày là chất liệu nhựa Plastic, kiểu FG phù hợp chơi bóng trên sân cỏ tự nhiên.  \n' +
            'Xuất xứ: SuperFake.\n' +
            'Sử dụng: Chuyên đá sân cỏ tự nhiên. \n' +
            'Màu: Hiện có nhiều phiên bản màu\n' +
            'Size: 39 đến 45\n',
        isDeleted: 0,
        releaseDate: new Date('2019-01-02'),
        viewed: 44,
        sale: 15,
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Nike MercurialX Superfly 6 FG SF (Dạ đen)',
        manufacturer: Nike,
        category: FG,
        img: 'img/Nike-MercurialX-Superfly-6-FG-SF-(Dạ-đen).jpg',
        price: 540000,
        status: true,
        info: 'Giày Nike Mercurial Victory 6 là siêu phẩm đời thứ 6 nằm trong bộ sưu tập Radiation Flare Pack được Nike ra mắt vào đầu năm 2017 và là sản phẩm chủ lực của hãng. Giày vẫn giữ nguyên form dáng của dòng Mercurial tiền nhiệm nhưng được bổ sung nhiều tính năng để tăng tính linh hoạt và bứt phá tốc độ. Toàn bộ thân giày là chất liệu da tổng hợp mềm mại giúp giảm trọng lượng giày, tạo cảm giác bóng cực kì tốt, nâng cao khả năng kiểm soát bóng. Phần lưỡi gà liền mạch với thân giày giúp hạn chế việc xê dịch lưỡi gà khi di chuyển. Đồng thời, cấu đế chắc chắn hơn giúp các cầu thủ tự tin hơn trong nhưng pha bóng tranh chấp.\n' +
            '\n' +
            'Chất liệu: \n' +
            '- Thân giày là simili cao cấp, chống thấm sơ, mềm, mịn, đàn hồi. Thân giày nguyên mảng, liền mạch không chấp vá làm tăng cảm giác bóng và kiểm soát. \n' +
            '- Đinh giày là chất liệu nhựa Plastic, kiểu FG phù hợp chơi bóng trên sân cỏ tự nhiên.  \n' +
            'Xuất xứ: SuperFake.\n' +
            'Sử dụng: Chuyên đá sân cỏ tự nhiên.\n' +
            'Màu: Hiện có nhiều phiên bản màu\n' +
            'Size: 39 đến 44\n',
        isDeleted: 0,
        releaseDate: new Date('2019-05-21'),
        viewed: 19,
        sale: 11,
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
    });

    const mvcAdmin = new Admin({
        email: 'abc@gmail.com',
        password: '123',
        info:{
            name: 'boss',
            address: 'NVC',
            sdt: '0315434',
            position: 'Nhân viên'
        }
    });

    mvcAdmin.password = mvcAdmin.generateHash(mvcAdmin.password);

    mvcAdmin.save(function (error) {
        if(error) throw error;
        console.log('Admin successfully saved');
    });

    const mvcCustomer = new Customer({
        username: 'dragon-straight',
        password: '78910JQKA',
        email:'sanhrong306@gmail.com',
        info:{
            name: 'Sảnh Rồng',
            address:'C306',
            sdt:'345678910',
        },
    });
    mvcCustomer.password = mvcCustomer.generateHash(mvcCustomer.password);

    mvcCustomer.save(function (error) {
        if(error) throw error;
        console.log('Customer successfully saved');
    });

    const mvcOrder = new Order({
       _id: new mongoose.Types.ObjectId(),
       infoCustomer: {
           name: 'Lưu Tuấn Nguyên',
           address: '170 Giang Tô',
           sdt: '12345678',
           email: 'nguyenluu211198@gmail.com',
       },
        payment: 'Ship COD',
        totalPrice: 500000,
        created: new Date('2019-05-01'),
        productList: [
            {
                name: 'Adidas Messi',
                price: 300000,
                quantity: 1
            },
            {
                name: 'Pan Vigor 8 TF',
                price: 200000,
                quantity: 1
            }
        ],
        isDeleted: 0,
        status: 'Đã giao'
    });

    mvcOrder.save(function (error) {
        if(error) throw error;
        console.log('Order successfully saved');
    });
});


