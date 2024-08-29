# Patched
This script has been patched. to buy a **private** working joiner and booster (proxyless) or any custom discord tools, dm me on discord @uutu or on telegram @tahagorme

# Discord Joiner and Boost Tool

This project is designed to automate the process of joining Discord servers and boosting them using multiple tokens. It utilizes the `discord.js-selfbot-v13` library for Discord interactions, `2captcha` for solving captchas, and proxies for managing multiple accounts.

## Configuration (`config.json`)

The `config.json` file is crucial for the operation of this script. Here's a breakdown of its contents:

- `invite`: The Discord invite code of the server you wish to join.
- `two_captcha_key`: Your API key from 2Captcha, used for solving captchas automatically.
- `captcha_retry_limit`: The maximum number of attempts to retry solving a captcha if the first attempt fails.
- `join_delay_min`: The minimum delay (in milliseconds) before attempting to join the server with a new token.
- `join_delay_max`: The maximum delay (in milliseconds) before attempting to join the server with a new token.
- `boost`: A configuration object for server boosting features.
  - `enabled`: A boolean indicating whether the boost feature is enabled (`true`) or disabled (`false`). Default is `false`.
  - `delay_min`: The minimum delay (in milliseconds) before attempting to boost a server. Default is `4000`.
  - `delay_max`: The maximum delay (in milliseconds) before attempting to boost a server. Default is `6000`.
  - `server_id`: The ID of the server where the boost should be applied. Leave as an empty string `""` if not using this feature.


your tokens should be in `tokens.txt` file in the root directory of the project.

## Proxy Support
 
This script supports proxies. Proxies are optional. create a `proxies.txt` file in the root directory of the project and add your proxies in the following format:

```plaintext
http://username:password@host:port
https://username:password@host:port
socks4://host:port
socks5://username:password@host:port
```

## Prerequisites

Before running the script, ensure you have Node.js installed on your system. You will also need a 2Captcha API key and a list of Discord tokens.


## Installation
for one click installation: run the installer.bat

Download [nodejs](https://nodejs.org/)



```javascript
git clone https://github.com/tahagorme/discord-joiner-and-boost-tool.git
```

```javascript
cd discord-joiner-and-boost-tool
```

```bash
npm i
```

```javascript
node .
```




## How It Works

- The script reads the configuration and token list.
- For each token, it attempts to join the specified Discord server.
- If captchas are encountered, it uses the 2Captcha service to solve them.
- Successes and failures are logged to the console.

## Error Handling

The script includes error handling for unhandled rejections and uncaught exceptions, logging detailed error information to the console.

## Note

This script is for educational purposes only. Misuse may violate Discord's terms of service.

## Contact

For support, questions, or contributions, feel free to reach out on Discord.

- **Discord**: @uutu

I'm available to assist with any queries related to the Discord Token Joiner and Booster project or if you're interested in contributing or suggesting new features. Don't hesitate to get in touch!

## Contributing

Contributions are welcome. Please open an issue or pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
