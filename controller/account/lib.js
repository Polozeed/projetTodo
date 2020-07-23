var User = require("../../schema/schemaUser.js");
var passwordHash = require("password-hash");

//----------------------// Fct signup //-----------------------------------------
async function signup(req, res) {
    var {password, email} = req.body;

    if (!email || !password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    // Création d'un objet user, dans lequel on hash le mot de passe
    const user = {
        email,
        password: passwordHash.generate(password)
    };
    // On verifie en base si l'utilisateur existe déjà
    try {
        const findUser = await User.findOne({
            email
        });
        if (findUser) {
            return res.status(400).json({
                text: "L'utilisateur existe déjà"
            });
        }
    } catch (error) {
        return res.status(500).json({error});
    }
    try {
        // Sauvegarde de l'utilisateur en BD
        const userData = new User(user);
        const userObject = await userData.save();
        return res.status(200).json({
            text: "Succès",
            token: userObject.getToken()
        });
    } catch (error) {
        return res.status(500).json({error});
    }
}
//----------------------// Fct Login //-----------------------------------------
async function login(req, res) {
        console.log(" je suis dans le login");
        const { password, email } = req.body;
        if (!email || !password) {

            //Le cas où l'email ou bien le password ne serait pas soumit ou nul
            return res.status(400).json({
                text: "Requête invalide"
            });
        }
        try {
            // On verifie si l'utilisateur existe en DB
            const findUser = await User.findOne({ email });
            if (!findUser)
                return res.status(401).json({
                    text: "L'utilisateur n'existe pas"
                });
            if (!findUser.authenticate(password))
                return res.status(401).json({
                    text: "Mot de passe incorrect"
                });
            return res.status(200).json({
                token: findUser.getToken(),
                text: "Authentification réussi"
            });
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
}

exports.login = login;
exports.signup = signup;