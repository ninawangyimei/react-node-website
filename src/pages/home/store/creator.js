import axios from 'axios';
import * as constants from './constants';
import {
  fromJS
} from 'immutable';

const changeHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  articleList: result.articleList,
  recommendList: result.recommendList,
});
const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
});
export const toggleShowTop = (show) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
});

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data;
      dispatch(changeHomeData(result));
    });
  }
}

export const getMoreList = (page) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?page=' + page).then((res) => {
      dispatch(addHomeList(res.data.articleList, page + 1));
    });
  }
}