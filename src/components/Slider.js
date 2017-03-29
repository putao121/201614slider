import React from 'react';
import $ from 'jquery';
require('./Slider.css');
export default class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {pos:0};
    }
    //走几步
    go(step){
          let pos = this.state.pos + step;
          // 0 1 2 3 4 5
          if(pos == this.props.images.length+1){
             this.sliders.css('left',0);
             pos = 1;
          }
          if(pos == -1){
              pos = this.props.images.length -1;
          }
          this.setState({pos})
          this.sliders.animate({left:pos*-1000},1000)
    }
    play(){//播放
        this.$timer = setInterval(()=>{
            this.go(1);
        },this.props.delay*1000)
    }
    //组件加载完成之后
    componentDidMount(){
        this.sliders = $('.sliders');
        console.log(this.sliders);
        if(this.props.autoPlay){//是否启动自动轮播
            this.play();//开始播放
        }
    }
    render() {
        let len = this.props.images.length;
        let style = {
            width:(len+1)*1000+'px',
            //left:this.state.pos*-1000+'px'
           /* transitionDuration:this.props.speed+'s'*/
        }
        return (
            <div className="slider-wrapper" onMouseOver={()=>clearInterval(this.$timer)} onMouseOut={this.play.bind(this)}>
                <ul className="sliders" style={style}>
                    {
                        this.props.images.map((image,index)=>{
                           return <li key={index} className="slider"><img src={image.src} alt={image.alt}/></li>
                        })
                    }
                  <li key={len} className="slider"><img src={this.props.images[0].src} alt={this.props.images[0].alt}/></li>
                </ul>
                <div className="slider-arrows">
                    <span onClick={()=>this.go(-1)} className="arrow arrow-left">&lt;</span>
                    <span onClick={()=>this.go(1)} className="arrow arrow-right">&gt;</span>
                </div>
                <div className="slider-dots">
                    {
                        this.props.images.map((image,index)=>{
                            return <span key={index} className={"dot  "+((this.state.pos == index||this.state.pos==4&&index==0)?'active':'')} onClick={()=>this.go(index - this.state.pos)}></span>
                        })
                    }
                </div>
            </div>
        )
    }
}
