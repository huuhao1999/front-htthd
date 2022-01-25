import React, { useState, useEffect } from 'react';
import Carousels from "react-elastic-carousel";
import CourseCard from './Cart';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const ProfileCourses = () => {
  const [highLight, setHighLight] = useState([]);
  useEffect(() => {
    const storedDataUserCart = localStorage.getItem('cart_web');
    if (storedDataUserCart) 
      setHighLight(JSON.parse(storedDataUserCart));
  }, [])
  return (
    <div className="online-courses container">
      <h1>
        Cart
      </h1>   
      <div className="carousel-wrapper" style={{ marginTop: '50px' }}>

      <div className="course-cards">
                {
                    highLight.map(
                        (item) => (
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
                            lecturer={item.quantity}
                            reviews={item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                            score={'10'}
                            productId = {item.id}
                            />
                        )
                    )
                }


            </div>
            </div>
          
    </div>
  )
};

export default ProfileCourses;
