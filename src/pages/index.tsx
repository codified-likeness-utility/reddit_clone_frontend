import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
	const [{ data }] = usePostsQuery();
	return (
		<>
			<NavBar />
			<div>hello world</div>
			{!data
				? null
				: data.posts.map((post) => (
						<div key={post._id}>{post.title}</div>
				  ))}
		</>
	);
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
