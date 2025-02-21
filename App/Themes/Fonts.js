import colors from "./Colors";

const type = {
  base: "Avenir-Book",
  bold: "Avenir-Black",
  emphasis: "HelveticaNeue-Italic"
};

const size = {
  h1: 38,
  h2: 36,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  label: 20,
  input: 19,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontWeight: "bold",
    fontSize: size.h1
  },
  h2: {
    fontWeight: "bold",
    fontFamily: "Roboto-Regular",
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  title: {   
    color: "#274541",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    fontWeight: "bold",
    //lineHeight: 22
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
