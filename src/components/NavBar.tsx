import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
	let body = null;
	// If data is loading
	if (fetching) {
		// User is not logged in
	} else if (!data?.me) {
		body = (
			<>
				{/* NextLink Uses client side routing */}
				<NextLink href='/login'>
					<Link mr={2}>Login</Link>
				</NextLink>
				<NextLink href='/register'>
					<Link mr={2}>Register</Link>
				</NextLink>
			</>
		);
		// User is logged in, displays username in NavBar
    } else {
        body =
        <Flex>
            <Box mr={2}>{data.me.username}</Box>
            <Button color='whiteAlpha.800' variant='link'>logout</Button>
        </Flex>;
	}

	return (
		<Flex bg='tomato' p={4}>
                <Box ml={"auto"}>{body}</Box>
		</Flex>
	);
};
