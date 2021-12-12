import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:9092/graphql',
  cache: new InMemoryCache()
});


const Usuarios = () => {
  /* const user = { form };
  console.log("Usergql:", form); */
  const USUARIOS = gql`
    mutation {
      createUser(
        user:{
          nombre:"Alejandro",
          identificacion:94357981,
          perfil:"Estudiante",
          clave:"qwertyu"
        })
    }
`;

  const { loading, error, data } = useMutation(USUARIOS)
  if (loading) return "<h1>Cargando</h1>"
  console.log("USUARIOS:", USUARIOS);
  console.log("data:", data);

};


export default Usuarios;