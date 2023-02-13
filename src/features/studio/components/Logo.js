
const Logo = "data:image/png;base64,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";

export default Logo;

