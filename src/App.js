import React, { Component } from 'react';
import './App.css';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper light-blue lighten-1">
                    <a href="#" className="brand-logo center">Recipe Box</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    </ul>
                </div>
            </nav>
        )
    }
}

class Description extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s12 m4">
                    <div className="card  light-blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Recipe Box</span>
                            <p>This is a Freecodecamp project made by <a style={{color: "white"}} href="#">Hoang Kien</a>
                            </p>
                            <p>Thanks to <a style={{color: 'white'}} href="http://materializecss.com/">MaterializeCss</a>,
                                <a style={{color: 'white'}} href="https://jquery.com/">JQuery</a>
                            and <a style={{color: 'white'}} href="https://facebook.github.io/react/">React</a></p>
                        </div>
                        <div className="card-action">
                            <a href="https://github.com/kienhg96/fcc-recipe-box" target="_blank">Github</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        if (this.props.defaultValue) {
            this.state = Object.assign({}, this.props.defaultValue);
        } else {
            this.state = {
                recipe: '',
                ingredients: ''
            }
        }
        this.doAdd = this.doAdd.bind(this);
    }
    doAdd() {
        if (this.state.recipe === '' || this.state.ingredients === '') {
            return;
        }
        this.props.onAdd(this.state);
        this.setState({
            recipe: '',
            ingredients: ''
        });
    }
    render() {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input id={"name" + (this.props.index ? this.props.index : '')} type="text" value={this.state.recipe}
                        onChange={(e) => this.setState({
                            recipe: e.target.value
                        })}
                    />
                    <label htmlFor={"name" + (this.props.index ? this.props.index : '')} className={this.props.isActive ? 'active': ''}>Recipe Name</label>
                </div>
                <div className="input-field col s12">
                    <textarea id={"content" + (this.props.index ? this.props.index : '')} className="materialize-textarea" value={this.state.ingredients}
                        onChange={(e) => this.setState({
                            ingredients: e.target.value
                        })}>
                    </textarea>
                    <label htmlFor={"content" + (this.props.index ? this.props.index : '')} className={this.props.isActive ? 'active': ''}>Enter Ingredients, Separate By Commas</label>
                </div>
                <div className="input-field col s12">
                    <a className="waves-effect waves-light btn"
                        onClick={this.doAdd}
                    >{this.props.edit ? 'Complete' : 'Add Recipe'}</a>
                </div>
            </div>
        );
    }
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            currentEdit: 0
        };
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onDelete(i) {
        this.props.onDelete(i);
    }

    onUpdate(i, obj) {
        this.setState({
            editable: false
        })
        this.props.onUpdate(i, obj);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <ul className="collapsible" data-collapsible="accordion">
                        {
                            this.props.value.map((e, i) => {
                                return (
                                    <li  key={i}>
                                        <div className="collapsible-header">{e.recipe}</div>
                                        <div className="collapsible-body">
                                            <ul className="collection">
                                                {
                                                    e.ingredients.split(',').map((s, j) => {
                                                        return (
                                                            <li className="collection-item" key={i + '' + j}>
                                                                {s.trim()}
                                                            </li>
                                                        )
                                                    })
                                                }
                                                <li className="collection-item">
                                                    <a onClick={() => this.onDelete(i)} className="waves-effect red btn">Delete</a>
                                                    <a style={{ marginLeft: "10px"}}
                                                        onClick={() => {
                                                            if (this.state.editable) {
                                                                this.setState({editable: false});
                                                            } else {
                                                                this.setState({editable: true, currentEdit: i});
                                                            }
                                                        }}
                                                        className="waves-effect blue btn">Edit</a>
                                                </li>
                                                {(this.state.editable && this.state.currentEdit === i) ? <Form onAdd={(obj) => {
                                                    this.onUpdate(i, obj);
                                                }} defaultValue={this.props.value[i]} index={i}
                                                    isActive={true}
                                                    edit={true}/> : null}
                                            </ul>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        let data = localStorage.getItem('_kienhg96_recipe');
        if (data) {
            this.state = JSON.parse(data);
        } else {
            this.state = {
                recipes: [
                    {
                        "recipe":"kien hoang",
                        "ingredients":"kien, van, hoang"
                    },
                    {
                        "recipe":"hoang kien",
                        "ingredients":"hoang, van, kien"
                    },
                    {
                        "recipe":"fruit",
                        "ingredients":"banana, apple"
                    }
                ]
            }
        }
        this.addRecipe = this.addRecipe.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.modifyState = this.modifyState.bind(this);
        this.updateElement = this.updateElement.bind(this);
    }

    modifyState(obj) {
        this.setState(obj);
        localStorage.setItem('_kienhg96_recipe', JSON.stringify(obj));
    }

    addRecipe(obj) {
        let newState = Object.assign({}, this.state);
        newState.recipes.push(obj);
        this.modifyState(newState);
    }

    deleteElement(i) {
        let newState = Object.assign({}, this.state);
        newState.recipes.splice(i, 1);
        this.modifyState(newState);
    }

    updateElement(i, obj) {
        let newState = Object.assign({}, this.state);
        newState.recipes[i] = obj;
        this.modifyState(newState);
    }

    render() {
        return (
            <div className="App">
                <Navbar/>
                <Form onAdd={this.addRecipe} />
                <Content value={this.state.recipes}
                    onDelete={this.deleteElement}
                    onUpdate={this.updateElement}/>
                <Description/>
            </div>
        );
    }
}

export default App;
