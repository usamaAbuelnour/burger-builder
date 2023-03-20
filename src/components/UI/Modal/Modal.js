import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
import Spinner from "../Spinner/spinner";

export default (props) => {
	let content = (
		<>
			<h2>Please Wait</h2>
			<Spinner />
		</>
	);

	if (props.purchase && !props.loading)
		content = (
			<>
				<h2>Your Order</h2>
				<p>A delicious burger with the following ingredients :</p>
				<ul style={{ display: "inline-block" }}>
					{Object.keys(props.ing).map((key) => (
						<li key={key}>
							{key}: {props.ing[key]}
						</li>
					))}
				</ul>
				<h4 className={classes.total}>Total:&nbsp;&nbsp;{props.total} $</h4>
				<p>Continue to Checkout?</p>
				<div className={classes.buttonGroup}>
					<Button type="danger" close={props.close}>
						Cancel
					</Button>
					<Button type="success" clicked={props.continue}>
						Continue
					</Button>
				</div>
			</>
		);

	if (props.err.state) content = <h2>{props.err.message}</h2>;

	return props.purchase ? (
		<>
			<Backdrop close={props.close} purchase={props.purchase} />
			<div className={classes.modal}>{content}</div>;
		</>
	) : null;
};
