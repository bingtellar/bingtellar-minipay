# Bingtellar Minipay DApp

This repository contains a prototype of the Bingtellar Minipay remittance dApp - a streamlined and easy way to send money using cUSD in your minipay wallet to any bank account and momo in Africa instantly, through a connected payment settlement system powered by Bingtellar's robust on and off-ramp infrastructure.

## Overview 

Simplifying global transactions within and beyond Africa is imperative for individuals and businesses. We began solving this by introducing the utility of stablecoins to emerging markets, integrating local payment networks with digital assets, and providing efficient on/off ramps. With Minipay, we're advancing to tackle fragmentation, improve accessibility, and enhance global connectivity.

## How to use

1. Run the following command to start the DApp

    ```bash
    npm start
    ```

    This will start the app at `http://localhost:3000`.

2. Since, this app is running on localhost and cannot be opened in MiniPay we need to create a tunnel we will use [ngrok](https://ngrok.com/) for the same.

3. Create an account on ngrok, setup ngrok on your machine.

    > [!NOTE]
    > ngrok is offering free static domain, use that so the url of the app does not change!

4. Use the following command, to start the tunnel.

    If you have the static domain

    ```bash
    ngrok http --domain=<STATIC_DOMAIN> 3000
    ```

    If not

    ```bash
    ngrok http 3000
    
    
### How to test your DApp in MiniPay

1. Open the MiniPay app on your phone and click on compass icon.

    ![minipay-app](https://github.com/celo-org/docs/blob/0712d6ec3231bd7d64a906d610a16deb1e6b037e/static/img/doc-images/minipay/minipay-1.png?raw=true)

2. Click on "Test Page" to open the MiniPay test page.

    ![minipay-apps-screen](https://github.com/celo-org/docs/blob/0712d6ec3231bd7d64a906d610a16deb1e6b037e/static/img/doc-images/minipay/minipay-2.png?raw=true)

3. Enter the URL of your DApp and click on "Go".

    ![minipay-site-tester](https://github.com/celo-org/docs/blob/0712d6ec3231bd7d64a906d610a16deb1e6b037e/static/img/doc-images/minipay/minipay-3.png?raw=true)
    
 ### Live demo of Bingtellar Minipay dApp
 
 [Video Demo](https://youtube.com/shorts/7BDTBwo0EWI?feature=share)

    
 ### Built With

* [Celo](https://celo.org/)
* [Solidity](https://docs.soliditylang.org/en/v0.8.19/)
* [Python](https://www.python.org/)
* [Ngrok](https://ngrok.com/)

<p align="right">(<a href="#top">back to top</a>)</p>  


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Bingtellar - [Website](https://bingtellar.com/) - hello@bingtellar.com - [Twitter](https://twitter.com/trybingtellar)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Celo](https://celo.org/)
* [Celo Camp](https://www.celocamp.com/)
* [Upright](https://www.upright.gg/)
* [MiniPay](https://www.opera.com/products/minipay)

<p align="right">(<a href="#top">back to top</a>)</p>
