import React, { useState, useEffect } from 'react';
import './styles.scss';

import GroupImg from 'static/group-40.svg';
import HomeImg from 'static/home.svg';
import MedalImg from 'static/medal.svg';
import TabletImg from 'static/tablet.svg';

import BannerCard from 'components/BannerCard';
import CourseContainer from 'components/CourseContainer';
import Carousels from "react-elastic-carousel";
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';
import CourseCard from 'components/CourseCard';
import { Carousel } from '3d-react-carousal';
let slides = [
  <img src="https://cdn-www.vinid.net/2020/03/%C4%90i-ch%E1%BB%A3-thu%C3%AA-l%C3%A0-g%C3%AC.jpg" alt="1" />,
  <img src="http://moneyideas.vn/wp-content/uploads/2018/07/y-tuong-kinh-doanh-dich-vu-di-cho-thue-1.jpg" alt="2" />,
  <img src="https://thesaigontimes.vn/wp-content/uploads/2021/08/di-cho-ho.jpg" alt="3" />,
  <img src="https://www.baotravinh.vn/uploads/image/2021/08/18/di%20cho.jpg" alt="4" />,
  <img src="https://i2.wp.com/giupviectheogio.com/wp-content/uploads/2020/05/dich-vu-di-cho.jpg?resize=800%2C500&ssl=1" alt="5" />];
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const Home = () => {
  const [cateRegis, setCateRegis] = useState([{
    "_id": 1,
    "name": "Thực phẩm sạch và chất lượng",
    "count": 2
  }]);
  const [highLight, setHighLight] = useState([]);
  const [mostOfView, setMostOfView] = useState([]);
  let contextCate = useCategory();
  const [lastest, setLastest] = useState([]);
  let context = useProduct();
  useEffect(() => {
    let mounted = true;
    context.getAllProduct()
      .then(items => {
        console.log(items);
        if (mounted) {
          setHighLight(items.data);
          let tempasd = [];
          for (let i=0; i< items.data.length; i++ ){
            if(i<= 5){
              tempasd.push( items.data[i]);
              if(i==5){
                setHighLight(tempasd);
                tempasd=[]
              }
            }

            if(i>5 &&i<= 10){
              tempasd.push( items.data[i]);
              if(i==10){
                setMostOfView(tempasd);
                tempasd=[]
              }
            }

            if( i >10){
              tempasd.push( items.data[i]);
              if(i==items.data.length-1){
                setLastest(tempasd);
                tempasd=[]
              }
            }




            
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
    // context.mostOfViews()
    //   .then(items => {
    //     if (mounted) {
    //       setMostOfView(items.data)
    //     }
    //   })
    // context.getLastest()
    //   .then(items => {
    //     if (mounted) {
    //       setLastest(items.data)
    //     }
    //   })
    // contextCate.mostRegisted()
    //   .then((items) => {
    //     if (mounted) {
    //       setCateRegis(items.data)
    //     }
    //   })
    return () => mounted = false;
  }, [])
  return (
    <div className="online-courses container">
      <h1>
      Đi Chợ Thuê
      </h1>

      <div className="banner-cards">
        <BannerCard
          image={GroupImg}
          title="Thực phẩm tươi sống."
          description="Thực phẩm Tấn Tài ngoài cung cấp sỉ rau củ quả, chúng tôi còn cung cấp hải sản giá sỉ, thực phẩm tươi sống tươi ngon cho các hệ thống nhà hàng, khách sạn, ..."
          link="https://www.google.com"
          linkText="See a demo."
        />
        <BannerCard
          image={HomeImg}
          title="Giao hàng nhanh"
          description="Dịch vụ giao hàng, vận tải, kho bãi chuyên nghiệp uy tín hàng đầu Việt Nam, là đối tác vận chuyển tin cậy được hơn 100.000 cửa hàng, doanh nghiệp yêu thích."
        />
        <BannerCard
          image={MedalImg} title="Dễ dàng chọn lựa"
          description="Chỉ cần ngồi ở nhà thì bạn có thể đặt hàng rồi"
          link="www.google.com"
          linkText="Read more."
        />
        <BannerCard
          image={TabletImg}
          title="An toàn vệ sinh thực phẩm"
          description="Vệ sinh an toàn thực phẩm hay an toàn thực phẩm hiểu theo nghĩa hẹp là một môn khoa học dùng để mô tả việc xử lý, chế biến, bảo quản và lưu trữ thực phẩm ..."
        />
      </div>

      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" style={{ marginBottom: '50px' }} />
        <Carousel slides={slides} autoplay={false} interval={1000} />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Những thực phẩm bán chạy trong tuần qua</p>
          <div className="carousel-wrapper" style={{ marginTop: '60px' }}>
            <Carousels breakPoints={breakPoints} style={{ marginTop: '50px' }}>
              {highLight.map((item) => (
                <CourseCard
                  title={item.name}
                  subTitle={item.categoryName}
                  happyStudents='1000'
                  hours='100h'
                  sessions="6"
                  isWeekend='true'
                  isWeekday='true'
                  price='0'
                  discount='0'
                  learnMoreLink='#'
                  imageLink={item.urlImage}
                  categoryName={item.categoryName}
                  lecturer={item.storeName}
                  reviews={item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                  score={'10'}
                  productId = {item.id}
                />

              ))}
            </Carousels>
          </div>
        </div>
      </div>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Nhu yếu phẩm cần thiết cho cuộc sống hàng ngày</p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <Carousels breakPoints={breakPoints}>
              {mostOfView.map((item) => (
                <CourseCard
                title={item.name}
                subTitle={item.categoryName}
                happyStudents='1000'
                hours='100h'
                sessions="6"
                isWeekend='true'
                isWeekday='true'
                price='0'
                discount='0'
                learnMoreLink='#'
                imageLink={item.urlImage}
                categoryName={item.categoryName}
                lecturer={item.storeName}
                reviews={item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                score={'10'}
                productId = {item.id}
                />

              ))}
            </Carousels>
          </div>
        </div>
      </div>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Những sản phẩm khuyến mại giảm giá</p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <Carousels breakPoints={breakPoints}>
              {lastest.map((item) => (
                <CourseCard
                title={item.name}
                subTitle={item.categoryName}
                happyStudents='1000'
                hours='100h'
                sessions="6"
                isWeekend='true'
                isWeekday='true'
                price='0'
                discount='0'
                learnMoreLink='#'
                imageLink={item.urlImage}
                categoryName={item.categoryName}
                lecturer={item.storeName}
                reviews={item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                score={'10'}
                productId = {item.id}
                />

              ))}
            </Carousels>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
