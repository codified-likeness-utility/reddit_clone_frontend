import React from "react";
import { Field, Form, Formik } from "formik";
import {
	Box,
	Button,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

const Login: React.FC<{}> = ({ }) => {
	const router = useRouter() // Function of Next.js
	const [,login] = useLoginMutation();
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, {setErrors}) => {
					const response = await login({options: values})
					console.log(response)
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors))
					} else if (response.data?.login.user) {
						router.push("/") //Send user back to home page once registered
					}
				}}
			>
				{(props) => (
					<Form>
						<InputField
							name='username'
							placeholder='username'
							label='Username'
						/>
						<Box mt={4}>
							<InputField
								name='password'
								placeholder='password'
								label='Password'
								type='password'
							/>
						</Box>
						<Button
							mt={4}
							colorScheme='linkedin'
							isLoading={props.isSubmitting}
							type='submit'
						>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Login;