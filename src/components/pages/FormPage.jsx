import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Input,
  Label,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Popup,
  Link,
  Toolbar,
  Tabs,
  Tab,
  SwipeoutActions,
  SwipeoutButton,
  Col,
  Progressbar,
  Segmented,
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  NavRight,
  Popover
} from 'framework7-react';
import {dialog} from 'framework7'
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
// const tabStyle = {
//   paddingTop: "0px"
// };
var items, image_link, breakfast, lunch, evening, first_snack = '', second_snack = '', lang_img;
if(localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'en'){
  var en = require('./en.json');
  lang_img = "img/en.png"
}else{
  var en = require('./ru.json');
  lang_img = "img/russia.png"
}
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], text: '', type: 1 };
    // this.state = { hits: null };
    this.jir = React.createRef();
    this.uglevod = React.createRef();
    this.belki = React.createRef();
    this.kalorii = React.createRef();
    this.type1 = React.createRef();
    this.type2 = React.createRef();
    this.jir_change = React.createRef();
    this.uglevod_change = React.createRef();
    this.belki_change = React.createRef();
    this.kalorii_change = React.createRef();
    this.money_change = React.createRef();
    this.money = React.createRef();
    this.enterData = this.enterData.bind(this);
    this.changeData = this.changeData.bind(this);
    this.changeRadio = this.changeRadio.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.asd = [];
    if(localStorage.getItem('id') == undefined){
      this.state = {
        popupOpened: true,
      }
    }else{
      this.state = {
        popupOpened: false,
      }
    }
    if(localStorage.getItem('status')){
      if(localStorage.getItem('id') && localStorage.getItem('status') == 'generate_product'){
        // test data!!!
        fetch('http://localhost:3000/test_data?id='+localStorage.getItem('id'), {mode: 'cors'})
        .then(response => response.text())
        .then((body) => {
          console.log(body);
          localStorage.setItem('products', body);
          localStorage.setItem('status', 'work');
          window.location.reload()
        });
      }
      var tmp;
      if(localStorage.getItem('id') && localStorage.getItem('status') == 'work'){
        var products = JSON.parse(localStorage.getItem('products'))
        var arr = [],
            sum = 0,
            obj = products,
            arr_num = [],
            tmp = [];
        for (var o = 0; o < obj.length; o++) {
          sum += parseInt(obj[o].calories)
          if(o == obj.length-1){
            for (var j = 0; j < obj.length; j++) {
              var z = parseInt(obj[j].calories)/sum*100
              arr.push(z); tmp.push(z);
              if(j == obj.length-1){
                console.log(arr);
                // 45 35 20
                tmp = sortGreatest(tmp);
                for (var i = 0; i < arr.length; i++) {
                  for (var b = 0; b < arr.length; b++) {
                    if(arr[i] == tmp[b]){
                      switch (i) {
                        case 0:
                            breakfast = <List>
                              <ListItem link={'/product-info/'+obj[b]._id}
                              title={obj[b].name}></ListItem>
                            </List>
                          break;
                        case 1:
                          lunch = <List>
                            <ListItem link={'/product-info/'+obj[b]._id}
                            title={obj[b].name}></ListItem>
                          </List>
                          break;
                        case 2:
                          evening = <List>
                            <ListItem link={'/product-info/'+obj[b]._id}
                            title={obj[b].name}></ListItem>
                          </List>
                          break;
                        case 3:
                          first_snack = <Card>
                            <CardHeader><b>{en.snacks}</b></CardHeader>
                            <CardContent>
                              <List>
                                <ListItem link={'/product-info/'+obj[b]._id}
                                title={obj[b].name}></ListItem>
                              </List>
                            </CardContent>
                            <CardFooter>
                              <Col>
                                <Button fill color="green">{en.consumed} 😎</Button>
                              </Col>
                              <Col>
                                <Button fill color="red">{en.skipped} ☹️</Button>
                              </Col>
                            </CardFooter>
                          </Card>
                          break;
                        case 4:
                        second_snack = <Card>
                            <CardHeader><b>{en.snacks}</b></CardHeader>
                            <CardContent>
                              <List>
                                <ListItem link={'/product-info/'+obj[b]._id}
                                title={obj[b].name}></ListItem>
                              </List>
                            </CardContent>
                            <CardFooter>
                              <Col>
                                <Button fill color="green">{en.consumed} 😎</Button>
                              </Col>
                              <Col>
                                <Button fill color="red">{en.skipped} ☹️</Button>
                              </Col>
                            </CardFooter>
                          </Card>
                          break;
                        default:
                      }
                    }
                  }
                }
              }
            }
          }
        }
        function sortGreatest(arr) {
          // manually sort array from largest to smallest:
          // loop forwards through array:
          for (let i = 0; i < arr.length; i++) {
            // loop through the array, moving forwards:
            // note in loop below we set `j = i` so we move on after finding greatest value:
            for (let j = i; j < arr.length; j++) {
              if (arr[i] < arr[j]) {
                let temp = arr[i]; // store original value for swapping
                arr[i] = arr[j]; // set original value position to greater value
                arr[j] = temp; // set greater value position to original value
              };
            };
          };
          return arr;
        };
        items = products.map((number, index) =>
          // subtitle = number.category+" "number.calories+"Ккал";
          <ListItem
            swipeout
            onSwipeoutDeleted={this.onDeleted.bind(this)}
            link={'/product-info/'+number._id}
            title={number.name}
            after={"$"+number.price}
            subtitle={(number.category+" - "+number.calories+en.kcal)}
            text={number.recipe}
            ref={(ref) => this.asd[index] = ref}
            routeProps={{my_test: "123"}}
            query={{my_test:"qwerty"}}
          >
            <SwipeoutActions right>
              <SwipeoutButton color="red" onClick={() => this.onDeleted(number.name)}>{en.change}</SwipeoutButton>
            </SwipeoutActions>
            <img slot='media' src='https://pbs.twimg.com/profile_images/425274582581264384/X3QXBN8C.jpeg' width='80' />
          </ListItem>
        )
      }
    }
    // const element = (
    //   <div>
    //     <h1>Hello, world!</h1>
    //     <h2>It is {new Date().toLocaleTimeString()}.</h2>
    //   </div>
    // );
    // // highlight-next-line
    // render(element, document.getElementById('my_div'));
  }
  // NEW ENTERDATA
  // enterData(){
  //   var jir = this.jir.current.state.currentInputValue,
  //       uglevod = this.uglevod.current.state.currentInputValue,
  //       belki = this.belki.current.state.currentInputValue,
  //       kalorii = this.kalorii.current.state.currentInputValue;
  //   // console.log(jir);
  //   fetch('http://localhost:3000/insert?jir='+jir+'&uglevod='+uglevod+'&belki='+belki+'&kalorii='+kalorii, {mode: 'cors'})
  //   .then(response => response.text())
  //   .then((body) => {
  //     console.log(body);
  //     var result = JSON.parse(body)
  //     localStorage.setItem('id', result._id)
  //     localStorage.setItem('status', 'generate_product');
  //     window.location.reload();
  //   });
  // }
  changeRadio(){
    if(this.state.type == 1){
      this.setState({
        type: 2
      })
    }else{
      this.setState({
        type: 1
      })
    }
  }
  changeLang(lang){
    localStorage.setItem('lang', lang)
    window.location.reload();
  }
  enterData(){
    var jir = this.jir.current.state.currentInputValue,
        uglevod = this.uglevod.current.state.currentInputValue,
        belki = this.belki.current.state.currentInputValue,
        kalorii = this.kalorii.current.state.currentInputValue,
        money = this.money.current.state.currentInputValue,
        type = (this.state.type == 2 || this.state.type == undefined) ? 1 : 2;
    if((jir !== '' && jir !== undefined) && uglevod !== '' && uglevod !== undefined && belki !== '' && belki !== undefined && kalorii !== '' && kalorii !== undefined && money !== '' && money !== undefined){
      fetch('http://localhost:3000/insert?type='+type+'&jir='+jir+'&uglevod='+uglevod+'&belki='+belki+'&kalorii='+kalorii, {mode: 'cors'})
      .then(response => response.text())
      .then((body) => {
        console.log(body);
        var json = JSON.parse(body)
        localStorage.setItem('id', json._id)
        localStorage.setItem('calories', json.kalorii)
        localStorage.setItem('status', 'generate_product');
        window.location.reload();
      });
    }else{
      const self = this;
      const $ = self.$$;
      self.$f7.dialog.create(
        {
          title: en.error,
          text: en.empty_fields,
          buttons: [{
            text: en.close
            }
          ]
        }
      ).open();
    }
  }
  changeData(){
    var jir = this.jir_change.current.state.currentInputValue,
        uglevod = this.uglevod_change.current.state.currentInputValue,
        belki = this.belki_change.current.state.currentInputValue,
        kalorii = this.kalorii_change.current.state.currentInputValue;
    console.log(this);
    // console.log(jir);
    // fetch('http://localhost:3000/change_data?jir='+jir+'&uglevod='+uglevod+'&belki='+belki+'&kalorii='+kalorii+'&id='+localStorage.getItem('id')+"&blocked_products="+localStorage.getItem('blocked_products'), {mode: 'cors'})
    // .then(response => response.text())
    // .then((body) => {
    //   console.log(body);
    //   var result = JSON.parse(body)
    //   console.log(result);
    //   localStorage.setItem('status', 'generate_product');
    //   window.location.reload();
    // });
  }
  // .then(response => {
  //   console.log(response);
  //   localStorage.setItem('id', JSON.stringify(response));
  //   localStorage.setItem('status', 'generate_product');
  // })

  onDeleted(name){
    var blocked = localStorage.getItem('blocked_products') ? JSON.stringify(localStorage.getItem('blocked_products')) : ""
    fetch('http://localhost:3000/change_dish?name='+name+"&blocked="+blocked, {mode: 'cors'})
    .then(response => response.text())
    .then((body) => {
      body = JSON.parse(body)
      var products = JSON.parse(localStorage.getItem('products'))
      for (var i = 0; i < products.length; i++) {
        if(products[i].name == name){
          var blocked_products = localStorage.getItem('blocked_products')
          if(blocked_products){
            var arr = blocked_products.split(',')
            arr.push(body.name)
            console.log(arr);
            localStorage.setItem('blocked_products', arr)
          }else{
            var arr = [body.name]
            console.log(arr);
            localStorage.setItem('blocked_products', arr)
          }
          products.splice(i, 1, body)
          localStorage.setItem('products', JSON.stringify(products))
          window.location.reload()
        }
      }
    });
  }

  // onDeleted = (nubmer, index, e) => {
  //   console.log(this);
  //   // var products = JSON.parse(localStorage.getItem('products'))
  //   // for (var i = 0; i < products.length; i++) {
  //   //   if(products[i].food_name == this.asd[index].props.title){
  //   //     var cals = products[i].Calories,
  //   //         name = products[i].food_name;
  //   //     var blocked_products = localStorage.getItem('blocked_products')
  //   //     if(blocked_products){
  //   //       var arr = blocked_products.split(',')
  //   //       arr.push(products[i].food_name)
  //   //       localStorage.setItem('blocked_products', arr)
  //   //     }else{
  //   //       var arr = [products[i].food_name]
  //   //       localStorage.setItem('blocked_products', arr)
  //   //     }
  //   //     fetch('http://localhost:3000/change_product?kalorii='+cals+'&name='+name+"&id="+localStorage.getItem('id')+"&blocked_products="+localStorage.getItem('blocked_products'), {mode: 'cors'})
  //   //     .then(response => response.text())
  //   //     .then((body) => {
  //   //       products.splice(index, 1, JSON.parse(body))
  //   //       localStorage.setItem('products', JSON.stringify(products))
  //   //       window.location.reload();
  //   //     });
  //   //   }
  //   // }
  // }

  render() {
   return (
     <Page>

      <Navbar title={en.app_name} />

        <Toolbar tabbar labels bottomMd={this.state.isBottom}>
          <Link tabLink="#tab-1" tabLinkActive text={en.food_basket} iconIos="f7:bag" iconMd="material:email"></Link>
          <Link tabLink="#tab-2" text={en.diary} iconIos="f7:today_fill" iconMd="material:today"></Link>
          <Link tabLink="#tab-3" text={en.settings} iconIos="f7:bars" iconMd="material:file_upload"></Link>
        </Toolbar>

        <Tabs>
          <Tab id="tab-1" className="page-content" tabActive style={{paddingTop: "0px"}}>
            <Block>
            <BlockTitle>{en.products}</BlockTitle>
            <List mediaList>
            {items}
            {/*<ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Бананы"
              after="15 ₽"
              subtitle="Фрукты"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="https://edaplus.info/food_pictures/banana.jpg" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Яблоки"
              after="30 ₽"
              subtitle="Фрукты"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="https://images.ua.prom.st/728972690_w640_h640_red_apple.jpeg" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Курица"
              after="300 ₽"
              subtitle="Мясо"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="https://s16.stc.all.kpcdn.net/share/i/12/9920392/inx960x640.jpg" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Йогурт"
              after="50 ₽"
              subtitle="Молочные"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="http://prinevskoe.ru/assets/images/production/milk/s_Jogurt-bez-nachinki-250g.JPG" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Салат"
              after="20 ₽"
              subtitle="Овощи"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Заменить</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="http://chtoem.ru/wp-content/uploads/2015/12/salat.jpg" width="80" />
            </ListItem>*/}
            </List>
            <Button className="col" big fill raised style={{background: "rgb(255, 224, 51)", color: "black"}}><b>{en.delivery}</b></Button>
            </Block>
          </Tab>
          <Tab id="tab-2" className="page-content" style={{paddingTop: "0px"}}>
              <div style={{margin: "15px"}}>
                <p style={{textAlign:"left"}}>
                {en.need_eat}
                <span style={{float:"right"}}>1400</span>
                </p>
                <p style={{textAlign:"left"}}>
                {en.consumed}
                <span style={{float:"right"}}>100</span>
                </p>
                <div>
                  <p><Progressbar progress={50} id="demo-inline-progressbar"></Progressbar></p>
                </div>
              </div>
            <Card>
              <CardHeader><b>{en.breakfast}</b></CardHeader>
              <CardContent>
                {breakfast}
              </CardContent>
              <CardFooter>
                <Col>
                  <Button fill color="green">{en.consumed} 😎</Button>
                </Col>
                <Col>
                  <Button fill color="red">{en.skipped} ☹️</Button>
                </Col>
              </CardFooter>
            </Card>
            {first_snack}
            <Card>
              <CardHeader><b>{en.lunch}</b></CardHeader>
              <CardContent>
                {lunch}
              </CardContent>
              <CardFooter>
                <Col>
                  <Button fill color="green">{en.consumed} 😎</Button>
                </Col>
                <Col>
                  <Button fill color="red">{en.skipped} ☹️</Button>
                </Col>
              </CardFooter>
            </Card>
            {second_snack}
            <Card>
              <CardHeader><b>{en.dinner}</b></CardHeader>
              <CardContent>
                {evening}
              </CardContent>
              <CardFooter>
                <Col>
                  <Button fill color="green">{en.consumed} 😎</Button>
                </Col>
                <Col>
                  <Button fill color="red">{en.skipped} ☹️</Button>
                </Col>
              </CardFooter>
            </Card>
          </Tab>
          <Tab id="tab-3" className="page-content" style={{paddingTop: "0px"}}>
            <Block>
              <List form formdata>
                <ListItem>
                  <Label>{en.fat}</Label>
                  <Input ref={this.jir_change} type="number" placeholder={en.fat} />
                </ListItem>
                <ListItem>
                  <Label>{en.carbohydrates}</Label>
                  <Input ref={this.uglevod_change} type="number" placeholder={en.carbohydrates} />
                </ListItem>
                <ListItem>
                  <Label>{en.proteins}</Label>
                  <Input ref={this.belki_change} type="number" placeholder={en.proteins} />
                </ListItem>
                <ListItem>
                  <Label>{en.calories}</Label>
                  <Input ref={this.money_change} type="number" placeholder={en.calories} />
                </ListItem>
                <ListItem>
                  <Label>{en.money}</Label>
                  <Input ref={this.money_change} type="number" placeholder={en.money_send} />
                </ListItem>
              </List>
            </Block>
            <Block>
              <Button popupOpen=".demo-popup" onClick={this.changeData} className="col" big fill raised color="green">{en.change_data}</Button>
            </Block>
            <Block>
              <Button popoverOpen=".popover-menu" className="col" big>{en.change_lang}</Button>
            </Block>
            <Block>
              <List>
                <ListItem
                  link="/blocked-products/"
                  title={en.black_list}
                >
                  <img slot="media" src="img/signal.png" width="40" />
                </ListItem>
              </List>
            </Block>
          </Tab>
        </Tabs>




        <Popup className="demo-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
        <Page>
        <Navbar title={en.enter_data}>
          <NavRight>
            <Link icon="icon-bars" popoverOpen=".popover-menu">
              <img src={lang_img} width="40px" />
            </Link>
          </NavRight>
        </Navbar>
        <BlockTitle>{en.data}</BlockTitle>
        <List form formdata>
          <ListItem>
            <Label>{en.fat}</Label>
            <Input ref={this.jir} type="number" placeholder={en.fat} />
          </ListItem>
          <ListItem>
            <Label>{en.carbohydrates}</Label>
            <Input ref={this.uglevod} type="number" placeholder={en.carbohydrates} />
          </ListItem>
          <ListItem>
            <Label>{en.proteins}</Label>
            <Input ref={this.belki} type="number" placeholder={en.proteins} />
          </ListItem>
          <ListItem>
            <Label>{en.calories}</Label>
            <Input ref={this.kalorii} type="number" placeholder={en.calories} />
          </ListItem>
          <ListItem>
            <Label>{en.money}</Label>
            <Input ref={this.money} type="number" placeholder={en.money_send} />
          </ListItem>
        </List>
        <BlockTitle>
          {en.food_type}
        </BlockTitle>
        <List mediaList>
        <ListItem
          radio
          value=""
          onChange={this.changeRadio}
          defaultChecked
          name="demo-media-checkbox"
          title={en.standart}
          text={en.standart_info}
        ></ListItem>
        <ListItem
          radio
          value=""
          onChange={this.changeRadio}
          name="demo-media-checkbox"
          title={en.standart_plus}
          text={en.standart_plus_info}
          ></ListItem>
        </List>
        <Block>
        <Button popupOpen=".demo-popup" onClick={this.enterData} className="col" big fill raised color="green">{en.create_menu}</Button>
        </Block>
        </Page>
        </Popup>
        <Popover className="popover-menu">
          <List>
            <ListItem link="#" onClick={() => this.changeLang("ru")} popoverClose title="Русский">
              <img src="img/russia.png" width="40px" />
            </ListItem>
            <ListItem link="#" onClick={() => this.changeLang("en")} popoverClose title="English">
              <img src="img/en.png" width="40px" />
            </ListItem>
          </List>
        </Popover>
      </Page>
    )
  }
}
