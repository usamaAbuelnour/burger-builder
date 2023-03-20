import { useState, useEffect, useRef } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn } from "../../store/slices/authSlice";
import Spinner from "../../components/UI/Spinner/spinner";
import { resetErr, signOut } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Auth() {
	const navigate = useNavigate();
	const { loading, error, token, signInSource } = useSelector(
		(state) => state.authSlice
	);
	const dispatch = useDispatch();
	let [orderForm, setOrderForm] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "E-mail",
			},
			defaultValue: "",
			valid: false,
			validation: {
				required: true,
			},
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Password",
			},
			defaultValue: "",
			valid: false,
			validation: {
				required: true,
				minlength: 1,
			},
		},
	});
	const [sign, setSign] = useState("In");

	const [formValidity, setFormValidity] = useState(false);

	const checkFormValidity = () => {
		let validity = true;
		Object.keys(orderForm).map((key) => (validity &= orderForm[key].valid));
		setFormValidity(!!validity);
		return !!validity;
	};

	//  checkformvalidity did update   LIFE SAVER 🥴
	useEffect(() => {
		checkFormValidity();
	}, [orderForm]);

	const checkValidity = (value, rules) => {
		let isValid = false;
		if (rules.required) isValid |= value.trim() !== "";
		if (rules.minlength) isValid &= value.trim().length >= rules.minlength;
		return isValid;
	};

	const changeHandler = (key, e) => {
		let valueValidity = checkValidity(
			e.target.value,
			orderForm[key].validation
		);
		setOrderForm({
			...orderForm,
			[key]: {
				...orderForm[key],
				defaultValue: e.target.value,
				valid: !!valueValidity,
			},
		});
	};

	const submitHandler = (authData, e) => {
		e.preventDefault();
		if (sign === "Up") dispatch(signUp(authData));
		else dispatch(signIn(authData));
	};

	// redirect depending on token value

	useEffect(() => {
		if (token && signInSource === "link") navigate("/");
		else if (token && signInSource === "button") navigate("/checkout");
	}, [token]);

	/////////////////////////////////

	const switchSignHandler = (e) => {
		e.preventDefault();
		dispatch(resetErr());
		setSign(sign === "Up" ? "In" : "Up");
	};

	return (
		<div className={classes.auth}>
			{loading ? (
				<Spinner />
			) : (
				<>
					<form
						onSubmit={submitHandler.bind(this, {
							email: orderForm.email.defaultValue,
							password: orderForm.password.defaultValue,
							returnSecureToken: true,
						})}
					>
						<legend style={{ fontSize: "20px", fontWeight: "bold" }}>
							Sign {sign}
						</legend>
						{Object.keys(orderForm).map((key) => {
							return (
								<Input
									key={key}
									elementType={orderForm[key].elementType}
									elementConfig={orderForm[key].elementConfig}
									defaultValue={orderForm[key].defaultValue}
									valid={orderForm[key].valid}
									changed={changeHandler.bind(this, key)}
								/>
							);
						})}
						<Button type="success" disabled={!formValidity}>
							Submit
						</Button>
						<Button type="danger" clicked={switchSignHandler} switch={true}>
							Sign {sign === "Up" ? "In" : "Up"} instead ?
						</Button>
					</form>
					<h2 style={{ color: "red", textShadow: "0 -1px black" }}>{error}</h2>
				</>
			)}
		</div>
	);
}
