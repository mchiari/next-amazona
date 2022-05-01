import {
	Button,
	List,
	ListItem,
	TextField,
	Typography,
	Link,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Register = () => {
	const router = useRouter();
	const { redirect } = router.query;
	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;

	useEffect(() => {
		if (userInfo) {
			router.push("/");
		}
	});

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const classes = useStyles();

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}
		try {
			const { data } = await axios.post("/api/users/register", {
				name,
				email,
				password,
			});
			dispatch({ type: "USER-LOGIN", payload: data });
			Cookies.set("userInfo", JSON.stringify(data));
			router.push(redirect || "/");
			router.reload(window.location.pathname);
		} catch (err) {
			alert(err.response.data ? err.response.data.message : err.message);
		}
	};
	return (
		<Layout title={"Register"}>
			<form className={classes.form} onSubmit={submitHandler}>
				<Typography component='h1' variant='h1'>
					Register
				</Typography>
				<List>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='name'
							label='Name'
							inputProps={{ type: "text" }}
							onChange={(e) => setName(e.target.value)}
						></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='email'
							label='Email'
							inputProps={{ type: "email" }}
							onChange={(e) => setEmail(e.target.value)}
						></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='password'
							label='Password'
							inputProps={{ type: "password" }}
							onChange={(e) => setPassword(e.target.value)}
						></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='confirmPassword'
							label='Confirm Password'
							inputProps={{ type: "password" }}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></TextField>
					</ListItem>
					<ListItem>
						<Button
							variant='contained'
							type='submit'
							fullWidth
							color='primary'
						>
							Register
						</Button>
					</ListItem>
					<ListItem>
						<Typography component='p'>
							Already have an account? &nbsp;
						</Typography>{" "}
						<NextLink
							href={`/login?redirect=${redirect || "/"}`}
							passHref
						>
							<Link>Login</Link>
						</NextLink>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
};

export default Register;
