import React from 'react';
import {Link} from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Component } from 'react';
import ServiceMarvel from '../../services/ServiceMarvel';

import './searchForm.css';


class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            load: false,
            error: false
        }
    }

    serviceMarvel = new ServiceMarvel();

    loadServ = () => {
        this.setState({
            load: true,
            error: false
        })
    }

    loadOk = () => {
        this.setState({
            load: false,
            error: false
        })
    }

    loadError = () => {
        this.setState({
            load: false,
            error: true
        })
    }

    getCharacterFromName = (name) => {
        this.loadServ()
        this.serviceMarvel.getCharacterFromName(name)
        .then(res => {
            this.loadOk();
            this.setState({
                data: res.data.results
            })
        })
        .catch(() => this.loadError());
    }


    render() {
        const {data} = this.state;
        const results = data === null ? null : data.length ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {data[0].name} page?</div>
                        <Link to={`/character/${data[0].name}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :

                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

        return (
            <div className="char__search-form">
                <Formik
                    initialValues={{ charName: ''}}
                    validationSchema={Yup.object({
                        charName: Yup.string().required('This field is required')
                    })}
                    onSubmit={({charName}) => {this.getCharacterFromName(charName)}}
                >
                    <Form>
                        <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                id="charName" 
                                name='charName' 
                                type='text' 
                                placeholder="Enter name"/>                
                           <button 
                                type='submit' 
                                className="button button__main"
                            >
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <ErrorMessage name="charName" component="div" className='char__search-error' />
                        {results}
                    </Form>
                </Formik>
            </div>
        )
    }
}

export default SearchForm;