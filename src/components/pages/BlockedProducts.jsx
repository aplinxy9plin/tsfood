import React from 'react';
import { Page, Navbar, Link, Block, BlockTitle, List, ListItem,  SwipeoutActions, SwipeoutButton, } from 'framework7-react';
var items = [];
var en = require('./en.json')
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.asd = [];
    this.state = { hits: null };
    var products = localStorage.getItem('blocked_products')
    if(products !== null){
      products = products.split(',')
      items = products.map((number, index) =>
        <ListItem
          swipeout
          onSwipeoutDeleted={this.onDeleted.bind(this)}
          title={number}
          after="20 ₽"
          subtitle={number.Calories}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          ref={(ref) => this.asd[index] = ref}
        >
          <SwipeoutActions right>
            <SwipeoutButton color="red" onClick={this.onDeleted.bind(this, number, index)}>{en.change}</SwipeoutButton>
          </SwipeoutActions>
          <img slot='media' src='https://pbs.twimg.com/profile_images/425274582581264384/X3QXBN8C.jpeg' width='80' />
        </ListItem>
      )
      if(items.length == 0){
        items = <p>{en.empty}</p>
      }
    }else{
      items = <p>{en.empty}</p>
    }
  }
  onDeleted = (nubmer, index, e) => {
    // var products = JSON.parse(localStorage.getItem('products'))
    // for (var i = 0; i < products.length; i++) {
    //   if(products[i].food_name == this.asd[index].props.title){
    //     var cals = products[i].Calories,
    //         name = products[i].food_name;
    //     var blocked_products = localStorage.getItem('blocked_products')
    //     if(blocked_products){
    //       var arr = blocked_products.split(',')
    //       arr.push(products[i].food_name)
    //       localStorage.setItem('blocked_products', arr)
    //     }else{
    //       var arr = [products[i].food_name]
    //       localStorage.setItem('blocked_products', arr)
    //     }
    //     fetch('http://chpok.ml:3000/change_product?kalorii='+cals+'&name='+name, {mode: 'cors'})
    //     .then(response => response.text())
    //     .then((body) => {
    //       products.splice(index, 1, JSON.parse(body))
    //       localStorage.setItem('products', JSON.stringify(products))
    //       window.location.reload();
    //     });
    //   }
    // }
  }
  render() {
   return (
      <Page>
        <Navbar title={en.black_list} backLink={en.back}></Navbar>
        <BlockTitle>{en.products}</BlockTitle>
        <Block>
          <List mediaList>
            {items}
          </List>
        </Block>
      </Page>
    )
  }
};
