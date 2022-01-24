import React, { useState, useEffect } from 'react';
import './styles.scss';
import CourseContainer from './CourseContainerSearch';
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';
import { useHistory } from "react-router-dom";
import Checkbox from './checkbox';
const Search = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const [query, setQuery] = useState({ ...params });
  const [checked, setChecked] = useState(params.category_id ? params.category_id : 0);
  const [category, setCategory] = useState([]);
  let contextCate = useCategory();
  let history = useHistory();
  let context = useProduct();
  useEffect(() => {
    const Temp = new URLSearchParams(window.location.search);
    let paramsTemp = Object.fromEntries(Temp.entries());
    setQuery(paramsTemp);
  }, [])
  useEffect(() => {
    contextCate.getCategoryList().then((res) => {
      setCategory(res.data);
    });

  }, []);
  const onCheckedCa = (e) => {
    const checkedBoolean = e.target.checked;
    if (checkedBoolean) {
      setChecked(e.target.value);
    } else setChecked(0);
  }
  const onChangeScore = (e) => {
    
    let entity = { ...query, order: e.target.value, }
    if (checked != 0) entity.category_id = checked;
    console.log(`/search?${serialize(entity)}`);
    history.push(`/search?${serialize(entity)}`);
    window.location.reload();
  }
  const serialize = function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  return (
    <div className="online-courses container">
      <h1>
        SEARCH
      </h1>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>

        <hr className="seperator" />
        <div style={{ color: 'white', display: 'inline' }}>
          {category.map((item) => (
            <div style={{ color: 'white', display: 'inline', marginRight: '20px' }}>
              <input type="checkbox" id="vehicle1" name="vehicle1" defaultValue={item.id} style={{ marginTop: '20px' }} onChange={onCheckedCa} checked={checked == item.id} />
              <label htmlFor="vehicle1">{item.name}</label>
            </div>
          ))}
        </div>

        <div style={{ padding: '20px' }}>
          <p style={{ color: 'white', fontSize: '20px' }}>You are searching: <b>{query.text ? query.text : ''}</b></p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>

            <CourseContainer
              query={query}
              checked={checked}
            />
          </div>
        </div>
      </div>
      <div className="book-button">
      </div>
    </div>
  )
};

export default Search;
