# Flutterwave Rave Magento 2x

A magento module that allows you to accept payment on Magento 2x

## Requirements
- Existing Magento2x installation on your web server.
- Go to Flutterwave Rave Live to get your LIVE public and private key
- Go to Flutterwave Rave Test to get your TEST public and private key
- Download the latest plugin from the latest release page.
- Take payments on your magento 2 store using Rave.

## Support for:

 - Credit card
 - Debit card
 - Bank account


## Install

###

### Composer

* composer require kingflamez/rave-magento2


### Manual Installation

*  Click the Download Zip button and save to your local machine.
*  Unpack(Extract) the archive.
*  Create a __Rave/Payments__ folder in your Magento's __app/code__ directory.
*  Copy the content into your Magento's __app/code/Rave/Payments__ directory.

### Enable the Rave Payments module:

*  From your commandline, in your magento root directory, run
   
```bash
php bin/magento module:enable Rave_Payments --clear-static-content
php bin/magento setup:upgrade
php bin/magento setup:di:compile
```

*  Once the `setup:upgrade` completes the module will be available in the Store Admin.



### Configure the plugin

Configuration can be done using the Administrator section of your Magento store.

* From the admin dashboard, using the left menu navigate to __Stores__ > __Configuration__ > __Sales__ > __Payment Methods__.
* Select __Rave By Flutterwave__ from the list of recommended modules.
* Set __Enable__ to __Yes__ and fill the rest of the config form accordingly, then click __Save Config__ to save and activate.
  Note: Public Key and Secret Key is required to activate this module for cart checkout.


### Suggestions / Contributions

For issues and feature request, [click here](https://github.com/kingflamez/rave-magento2x/issues).
To contribute, fork the repo, add your changes and modifications then create a pull request.


### License

##### GPL-3. See LICENSE.txt
