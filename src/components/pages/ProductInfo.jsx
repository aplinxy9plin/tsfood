import React from 'react';
import { Page, Navbar, Link, Block, BlockTitle, List, ListItem } from 'framework7-react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YandexMap = () => (
  <YMaps>
    <Map defaultState={{ center: [56.486112, 84.958607], zoom: 14 }} width={"100%"} height={"30%"}>
      <Placemark geometry={[56.486112, 84.958607]} />
    </Map>
  </YMaps>
);
var block, items, image_link, image;

var ProductImage = class extends React.Component{
  render() {
    return(
       <img src={this.props.src} width="100%"/>
     )
  }
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "test_src"
    }
    console.log(this.props);
    this.state = { hits: null };
    var arr = JSON.parse(localStorage.getItem('products')),
        search = "";
    for (var i = 0; i < arr.length; i++) {
      if(props.id == arr[i]._id){
        console.log(arr[i].name);
        if(arr[i].products){
          items = arr[i].products.map((number, index) =>
            <ListItem title={number.name}></ListItem>
          )
          search = " блюдо"
        }
        // image_link = arr[i].image
        fetch('https://api.cognitive.microsoft.com/bing/v7.0/images/search?q='+arr[i].name+search, { method: 'GET',
          headers:
           { 'ocp-apim-subscription-key': '71c7238bf98d457ebc26f370f93e1332' } })
        .then(response => response.text())
        .then((body) => {
          var json = JSON.parse(body)
          this.setState({
            image: json.value[0].contentUrl
          })
          console.log(this.state.image);
        });
        console.log(arr[i].image);
        if(arr[i].products){
          block = <Block strong>
            <h1>{arr[i].name}</h1>
            <h4>{arr[i].calories} ккал</h4>
            <p><b>Категория:</b> {arr[i].category}</p>
            <p><b>Рецепт:</b> <br/>{arr[i].recipe}</p>
            <h1>Ингредиенты</h1>
            <List simple-list>
              {items}
            </List>
          </Block>
        }else{
          block = <Block strong>
            <h1>{arr[i].name}</h1>
            <h4>{arr[i].calories} ккал</h4>
            <p><b>Категория:</b> {arr[i].category}</p>
            <p><b>Рецепт:</b> <br/>{arr[i].recipe}</p>
            <List simple-list>
              {items}
            </List>
          </Block>
        }
      }
    }
  }
  render() {
   const {image} = this.state;
   return (
    <Page style={{backgroundColor: "#fff"}}>
        {/*<img src={image_link} width="100%" />/*/}
        <ProductImage src={this.state.image} />
        <Navbar title="Продукт" backLink="Назад"></Navbar>
        {block}
        <BlockTitle>Магазины рядом:</BlockTitle>
        <YandexMap />
        <br />
      </Page>
    )
  }
};
