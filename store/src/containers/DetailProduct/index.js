import React, { useState, useRef, useEffect } from 'react';
import Colors from '../../components/Colors'
import DetailsThumb from '../../components/DetailsThumb';
import './style.css'
import { useProduct } from '../../contexts/product.context';
import { useProfile } from '../../contexts/profile.context';
import { useAuth } from '../../contexts/auth.context';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from "react-router";
import Rating from '@material-ui/lab/Rating';
import CourseCard from 'components/CourseCard';
import { BoxLoading } from 'react-loadingg';
import { makeStyles } from '@material-ui/core/styles';
import reviewImage from '../../static/review.svg';
import Carousels from "react-elastic-carousel";
import moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Review from './reviews/index';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
let imagesThum = [
  "http://tiasang.com.vn/Portals/0/Images/Dao-tao-KHDL-anh-1.jpg",
  "https://cdn.vietnambiz.vn/2019/10/15/1nvhe7mchqmjbgyvx-uobra-15711056360651103109227.png",
  "https://duhocue.edu.vn/public/uploads/images/hinh-tin-tuc/Nganh-khoa-hoc-may-tinh-nam-2019-top-5-truong-dai-hoc-nen-lua-chon.jpg",
];
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];
const DetailPage = () => {

  const reviewValueSend = useRef('')
  const classes = useStyles();
  let contextProduct = useProduct();
  let contextProfile = useProfile();
  const [productSuchas, setProductSuchas] = useState([]);
  const { id } = useParams();
  let { authenticated, user } = useAuth();
  const [products, setProducts] = useState({});
  const [reviews, setReviews] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [isLearn, setIsLearn] = useState(true);
  const [isReview, setIsReview] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videos, setVideos] = useState([]);
  const [imageThunal, setImageThunal] = useState(['https://thietkegame.com/wp-content/uploads/2020/03/loading-8bit.jpg']);
  let history = useHistory()
  useEffect(() => {

    let mounted = true;
    setTimeout(function () {
      contextProduct.getDetailProductById(id)
        .then(items => {
          if (mounted) {
            setProducts(items.data);
            console.log(items.data);
            setImageThunal([items.data.urlImage]);
            contextProduct.getDetailProductById1(items.data.categoryId)
              .then(it => {
                console.log(it);
                if (mounted) {
                  //const result = it.data.filter(function (el) { return el._id != items.data._id; });
                  setProductSuchas(it.data);
                }
              })
          }
        })
      contextProduct.getAllReviews(id).then((res) => {

        setReviews(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }, 0);
    return () => mounted = false;
  }, [])
  const [index, setIndex] = useState(0)
  let myRef = React.createRef();
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  const handleJoin = () => {
    if (authenticated) {
      const storedDataUserCart = localStorage.getItem('cart_web');
      if (storedDataUserCart) {
        let cart = JSON.parse(storedDataUserCart);
        let flat = 0;
        for (let asd of cart) {
          if (asd.id == products.id) {
            asd.quantity = asd.quantity?  asd.quantity + 1: 1;
            flat = 1;
          }
        }
        if (flat == 0) {
          let a1 = products;
        a1.quantity = 1;
          cart.push(a1);
        }
        



        localStorage.setItem(
          'cart_web',
          JSON.stringify(cart)
        );
      } else {

        let a1 = products;
        a1.quantity = 1;
        let cart = [a1];
        localStorage.setItem(
          'cart_web',
          JSON.stringify(cart)
        );


      }
      addNoti('Thêm giỏ hàng thành công', 'success', "Thêm");

    } else {
      history.push('/signin');
    }
  }
  const handleJoinMua = () => {
    if (authenticated) {
      const storedDataUserCart = localStorage.getItem('cart_web');
      if (storedDataUserCart) {
        let cart = JSON.parse(storedDataUserCart);
        let flat = 0;
        for (let asd of cart) {
          if (asd.id == products.id) {
            asd.quantity = asd.quantity?  asd.quantity + 1: 1;
            flat = 1;
          }
        }
        if (flat == 0) {
          let a1 = products;
        a1.quantity = 1;
          cart.push(a1);
        }
        



        localStorage.setItem(
          'cart_web',
          JSON.stringify(cart)
        );
      } else {

        let a1 = products;
        a1.quantity = 1;
        let cart = [a1];
        localStorage.setItem(
          'cart_web',
          JSON.stringify(cart)
        );


      }
 //     addNoti('Thêm giỏ hàng thành công', 'success', "Thêm");
      history.push('/checkout');
    } else {
      history.push('/signin');
    }
  }


  
  const handleJoinLearnContinue = () => {
    history.push(`/detail/${id}/videos`)
  }
  const [rate, setRate] = useState(5);
  const sendReviews = () => {
    let entity = {
      score: rate,
      content: reviewValueSend.current.value
    }
    contextProduct.createReview(entity, id).then((res) => {
      addNoti('Add review successfully', 'success', "Add");
      setTimeout(function () { window.location.reload(false); }, 2000);
      //Xử lí review
      let temp = reviews;
      let entityTemp = {
        ...entity,
        create_at: (new Date()).toISOString(),
        full_name: user.user.full_name,
        avatar_url: user.user.avatar_url,
      }
      temp.unshift(entityTemp);
      setReviews(temp);
    }).catch((rerr) => {
      console.log(rerr);
      addNoti('Add review faild', 'danger', "Add")
    })
  }
  const handleYeuThich = () => {
    if (isLiked) {
      contextProfile.deleteWishList(id).then((res) => {
        addNoti('Remove wishlist successfully', 'success', "Remove");
        setIsLiked(false);
      }).catch((err) => {
        console.log(err);
        addNoti('Remove wishlist faild', 'danger', "Remove")
      })
    } else {
      contextProfile.createWishList({ product_id: id }).then((res) => {
        addNoti('Add wishlist successfully', 'success', "Add");
        setIsLiked(true);
      }).catch((err) => {
        addNoti('Add wishlist faild', 'danger', "Add")
      })
    }

  }
  const addNoti = (mes, type, title) => {
    store.addNotification({
      title: title,
      message: mes,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
    });
  }
  return (
    <div className="app123">
      {
        products ? (
          <div className="details123" >
            <div className="big-img123">
              <img src={imageThunal[index]} alt="" />
              <h1>Reviews</h1>
              {
                !isReview && authenticated && isLearn ? <div>
                  <FormControl className={classes.margin} style={{ marginLeft: '20px' }}>
                    <InputLabel htmlFor="input-with-icon-adornment">Reviews content</InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      inputRef={reviewValueSend}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }

                    />
                    <Rating style={{ marginTop: '10px' }}
                      name="simple-controlled"
                      value={rate}
                      onChange={(event, newValue) => {
                        setRate(newValue);
                      }}
                    />
                  </FormControl>
                  <Button
                    style={{ marginTop: '13px', marginLeft: '10px', background: '#50a3ec47' }}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                    onClick={sendReviews}
                  >
                    Send
                  </Button>
                </div> : ''
              }
              {reviews.length == 0 ? <div style={{ marginTop: '20px' }}>No reviews</div> :
                <Review reviews={reviews} />
              }

            </div>
            <div className="box">
              <div className="row">
                <h2>{products.name || "Đang tải tên sản phẩm"}</h2>

              </div>
              <p>{products.price ? products.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ''}</p>
              <button className="cart" style={{ backgroundColor: 'rgb(197 185 38)' }} onClick={handleJoin}>Thêm giỏ hàng</button>
              <br />
              <button className="cart" onClick={handleJoinMua}>Mua ngay</button>
              <p><b>Detail: </b> {products.fullDescription}</p>
              <p>
                <div dangerouslySetInnerHTML={{ __html: products.fullDescription }}>
                </div></p>
              <p style={{ opacity: 0.4, fontStyle: 'oblique', fontSize: '13px' }}><b>Update at: </b>{moment(products.update_at).format("hh:mm DD/MM/YYYY")}</p>


            </div>

          </div>
        ) : <BoxLoading />

      }
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" style={{ width: '80%' }} />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Những sản phẩm gợi ý cho bạn</p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <Carousels breakPoints={breakPoints}>
              {productSuchas.map((item) => (
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
                  reviews={item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                  score={'10'}
                  productId={item.id}
                />
              ))}
            </Carousels>
          </div>
        </div>
      </div>
    </div >
  );
}

export default DetailPage;
//<img src={item.src[index]} alt="" />
//
// <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />