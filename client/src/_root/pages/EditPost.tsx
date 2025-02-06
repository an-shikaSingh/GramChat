import { useNavigate, useParams } from "react-router-dom";
import { SvgIcon } from "../../components";
import PostForm from "../../components/forms/PostForm";
import { useGetPostById } from "../../lib/react-query/queriesAndMutations";
import { useAuth } from "../../lib/context/AuthContext";
import { TailSpin } from "react-loader-spinner";

const EditPost = () => {
  const { id: postId } = useParams();
  const { setToast } = useAuth();

  // if there is no postId in the url
  if (!postId) {
    const navigate = useNavigate();
    navigate('/');
    return;
  }

  // Get the post from the database
  const { data: memeData, isFetching, isError } = useGetPostById(postId);

  // If there is an error then display it
  if (isError) {
    setToast(["Error","An error occurred while fetching post"]);
    return;
  }

  // While the post is fetching display loading
  if (isFetching) {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <TailSpin width="100px" height="100px" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <div style={{ display: "flex", flex: "1", padding: "20px", flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
        <span style={{ color: '#eeeeee', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
          <SvgIcon
            viewbox="0 0 24 24"
            width="40px"
            height="40px"
            path={[
              "M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z",
            ]}
          />
          <h2>Edit Post</h2>
        </span>
        <PostForm existingPost={memeData} />
      </div>
    </div>
  );
};

export default EditPost;
