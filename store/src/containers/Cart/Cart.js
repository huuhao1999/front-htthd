import React from 'react';
import authorImage from 'static/writer.svg';
import TimerImage from 'static/timer.svg';
import GrowthImage from 'static/growth.svg';
import CommunityImage from 'static/community.svg';
import viewsImage from 'static/vision.svg';
import reviewImage from 'static/review.svg';
import RupeesImage from 'static/rupees.svg';
import OfferImage from 'static/offer.svg';
import menuImage from 'static/menu.svg';
import './style.css';
import './styles.scss';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Rating from '@material-ui/lab/Rating';
import { InputNumber, Rate } from "antd";
import { Height } from '@material-ui/icons';
import { white } from 'material-ui/styles/colors';
import { Button } from '@material-ui/core';
const CourseCard = ({
  title,
  happyStudents,
  lecturer,
  productId,
  imageLink,
  categoryName,
  reviews,
  score
}) => (
  <div className="course-card" style={{display: "flex",
    width: "800px",
    margin: "20px"}}>
    <div style={{ height: '150px', width: '250px', margin: 'auto', padding: '10px', backgroundColor: white, borderRadius: '5px', marginTop: '13px', opacity: '0.8' }}>
      {imageLink ? <div className="edit_mainge_ok" ><img alt="" className="edit_mainge" src={imageLink} style={{ maxHeight: '150px', maxWidth: '250px', }} /></div>
        : <div className="card-image" />}
    </div>

    <div className="card-body">
      <div className="title">
        <Link to={`/detail/${productId}`} style={{ textDecoration: 'none' }} onClick={() => { setTimeout(() => { window.location.reload(false); }, 0); }}>
          <h6>
            {title}
          </h6>
        </Link>

      </div>
      <div className="details">
        <div className="detail">
          <img alt="" src={GrowthImage} />
          <p><b></b> Sản phẩm sạch và chất lượng</p>
        </div>
        <div className="detail">
          <img alt="" src={menuImage} />
          <p>
            {categoryName}
          </p>
        </div>
        <div className="detail">
          <img alt="" src={authorImage} />
          <p>
           Số lượng: {lecturer}
          </p>
        </div>
        <div className="detail">
          <img alt="" src={reviewImage} />
          <p>
            {reviews || 0}
          </p>
        </div>
      </div>

      <div className="price-offer">
        <div className="price">

          <div className="detail">

          </div>
        </div>
      </div>

      <div className="link">
      <Button>
         Giảm
        </Button>
        <Button style={{color: '#761313'}}>
         Remove
        </Button>
        <Button>
         Thêm
        </Button>
      </div>
    </div>
  </div>
)

export default CourseCard;