const {createTestAccount, createTransport, getTestMessageUrl} = require("nodemailer")
const Liquid = require("liquid")
const {promises} = require("fs")
const {join} = require("path")
const mjml = require("mjml")

const liquidEngine = new Liquid.Engine()

const main = async () => {
	const testAccount = await createTestAccount()
	const transporter = createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	})

	const templates = await promises.readdir(join(__dirname, "../templates"))

	for (const template of templates) {
		if (!(/\.mjml$/.test(template) || /\.html$/.test(template))) continue

		const json = await promises.readFile(
			join(__dirname, "../data", `${template.slice(0, -5)}.json`)
		)
		const options = JSON.parse(json)
		const file = await promises.readFile(join(__dirname, "../templates", template))
		let html

		if (/\.mjml$/.test(template)) {
			const mjmlTemplate = await liquidEngine.parseAndRender(String(file), options)
			html = mjml(mjmlTemplate).html
		} else {
			html = await liquidEngine.parseAndRender(String(file), options)
		}

		await promises.writeFile(join(__dirname, "../out", `${template.slice(0, -5)}__out.html`), html)

		const info = await transporter.sendMail({
			// eslint-disable-next-line quotes
			from: '"Test Account" <test@example.com>',
			to: "test@test.com",
			subject: "test mail",
			html
		})

		console.log(`Template: ${template}, Preview URL:`, getTestMessageUrl(info))
	}
}

main()
