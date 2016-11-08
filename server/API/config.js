var config = {
	OAUTH2_SERVER: 'http://localhost:9999/uaa',
  OAUTH2_ACCESS_TOKEN: this.OAUTH2_SERVER + '/oauth2/token',
  OAUTH2_BASIC_AUTH: 'Basic cXktY2xpZW50OjEyMzQ1Ng==',
	TOKENTIME : 60 * 60,
	PORT:3030
};

module.exports = config;
