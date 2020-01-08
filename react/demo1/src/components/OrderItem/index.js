/**
 * Created by Admin on 2019/1/28.
 */
import React,{ Component } from 'react';
import './style.scss'

class OrderItem extends Component {

    constructor(props){
        super(props);

        // this.showCommentArea = this.showCommentArea.bind(this);
        // this.hideCommentArea = this.hideCommentArea.bind(this);
        // this.setStars = this.setStars.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.commentTextareaChange = this.commentTextareaChange.bind(this);

        this.state = {
            editing: false,
            stars: props.data.stars || 0,
            commentValue: props.data.comment || ''
        }
    }

    showCommentArea = () => {
        if(!this.state.editing){
            this.setState({
                editing: true
            })
        }
    }

    hideCommentArea = () => {
        if(this.state.editing){
            this.setState({
                editing: false,
                stars: this.props.data.stars || 0,
                commentValue: this.props.data.comment || ''
            })
        }
    }

    setStars(index){
        this.setState({
            stars: index+1
        })
    }

    submitComment(){
        //ifCommented = false
        const { index } = this.props;
        const { stars, commentValue } = this.state;
        this.props.comments(index, commentValue, stars);
        this.setState({
            editing: false,
            stars: this.props.data.stars || 0,
            commentValue: this.props.data.comment || ''
        })
    }

    commentTextareaChange(event){
        // console.log(event.target.value);
        this.setState({commentValue: event.target.value});
    }

    render() {
        const { shop, product, price, picture, ifCommented } = this.props.data;
        return(
            <div>
                <div className="orderItem">
                    <div className="orderItem__picContainer">
                        <img className="orderItem__pic" src={picture}/>
                    </div>
                    <div className="orderItem__content">
                        <div className="orderItem__product">{product}</div>
                        <div className="orderItem__shop">{shop}</div>
                        <div className="orderItem__detail">
                            <div className="orderItem__price">{price}</div>
                            <div>
                                {
                                    ifCommented ? (
                                        <button className="orderItem__btn orderItem__btn--grey">已评价</button>
                                    ) : (
                                        <button className="orderItem__btn orderItem__btn--red" onClick={this.showCommentArea}>评价</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.editing ? this.renderEditArea() : null }
            </div>
        )
    }

    renderEditArea(){
        return (
            <div className="orderItem__commentContainer">
                <textarea className="orderItem__comment" onChange={this.commentTextareaChange} value={this.state.commentValue} />
                { this.renderStars() }
                <button className="orderItem__btn orderItem__btn--red" onClick={this.submitComment}>提交</button>
                <button className="orderItem__btn orderItem__btn--grey" onClick={this.hideCommentArea}>取消</button>
            </div>
        )
    }

    renderStars(){
        const { stars } = this.state;
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        const light = stars >= item ? "orderItem__star--light" : "";
                        return (
                            <span className={light} key={index} onClick={this.setStars.bind(this, index)}>★</span>
                        )
                    })
                }
            </div>
        )
    }
}

export default OrderItem;