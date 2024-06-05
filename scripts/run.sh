#!/bin/bash

cd extensions/dev-finance-extension/

yarn build

cd ../..

yarn deploy
