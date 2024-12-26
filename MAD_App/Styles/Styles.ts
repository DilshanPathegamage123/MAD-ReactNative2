import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 16,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
  },

  heading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },

  input: {
    width: "100%",
    height: 40,
    padding: 10,
    marginVertical: 8,
    // borderWidth: 2,
    // borderColor: "rgb(43, 218, 87)",
    borderRadius: 5,
    // boxShadow: "5 5 0 0px rgba(94, 97, 93, 0.23)",
    backgroundColor: "white",
  },
  textClass: {
    color: "rgb(255, 255, 255)",
    marginTop: 16,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 10,
    marginTop: 16,
    backgroundColor: "#007bff",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default styles;
