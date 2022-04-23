import React, {useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                value: action.value,
                isValid: action.value.includes("@")
            }
        case 'INPUT_BLUR':
            return {
                ...state,
                isValid: state.value.includes("@")
            }
        default:
            return state;
    }
}

const passwordReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                value: action.value,
                isValid: action.value.trim().length > 0
            }
        case 'INPUT_BLUR':
            return {
                ...state,
                isvalid: state.value.trim().length > 0
            }
        default:
            return state;
    }
}

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormIsValid(
                emailState.isValid && passwordState.isValid
            )
        }, 1000)
        return (() => {
            clearTimeout(timeout)
        })
    }, [emailState.isValid, passwordState.isValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'CHANGE',
            value: event.target.value
        })
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'CHANGE',
            value: event.target.value
        })
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'})
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.value === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
