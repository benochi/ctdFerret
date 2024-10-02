
const logon = (req, res) => {
  const { name } = req.body;
  if (name) {
    res.cookie("name", name, { httpOnly: true });
    res.status(201).json({ message: `Hello ${name}` });
  } else {
    res.status(400).json({ message: "Please provide a name" });
  }
};

const logoff = (req, res) => {
  res.clearCookie("name");
  res.json({ message: "Logged off" });
};

const testAuth = (req, res) => {
  res.json({ message: `Welcome ${req.user}` });
};

module.exports = { logon, logoff, testAuth };
