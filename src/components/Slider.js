import React from 'react';
require('./Slider.css');
export default class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {pos:0};
    }
    //走几步
    go(step){
          let pos = this.state.pos + step;
          if(pos == this.props.images.length){
              pos = 0;
          }
          this.setState({pos})
    }
    play(){//播放
        this.$timer = setInterval(()=>{
            this.go(1);
        },this.props.delay*1000)
    }
    //组件加载完成之后
    componentDidMount(){
        if(this.props.autoPlay){//是否启动自动轮播
            this.play();//开始播放
        }
    }
    render() {
        let len = this.props.images.length;
        let style = {
            width:len*1000+'px',
            left:this.state.pos*-1000+'px',
            transitionDuration:this.props.speed+'s'
        }
        return (
            <div className="slider-wrapper" onMouseOver={()=>clearInterval(this.$timer)} onMouseOut={this.play.bind(this)}>
                <ul className="sliders" style={style}>
                    {
                        this.props.images.map((image,index)=>{
                           return <li key={index} className="slider"><img src={image.src} alt={image.alt}/></li>
                        })
                    }
                </ul>
                <div className="slider-arrows">
                    <span onClick={()=>this.go(-1)} className="arrow arrow-left">&lt;</span>
                    <span onClick={()=>this.go(1)} className="arrow arrow-right">&gt;</span>
                </div>
            </div>
        )
    }
}