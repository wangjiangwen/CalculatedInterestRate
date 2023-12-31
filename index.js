let bankRates = [2.65, 2.9, 3.1, 3.3]
let realBankRates = [5, 5.9, 6.1]
let yearNumbers = [3, 5]
let moneys = [200000, 300000, 500000]

const yearDay = 365
const diffDay = 50

// 自定义利率参数
const customBankRate = 3.1;
const customYearNumber = 3;
const customMonkey = 800000;
const customRealBankRate = 5;
const customDay = 974;
const hasDiff = true;

bankRates = [customBankRate]
yearNumbers = [customYearNumber]
moneys = [customMonkey]
realBankRates = [customRealBankRate]

// 差值利率
function interestDiff(hasDiff) {
    
    for (let index = 0; index < bankRates.length; index++) {
        const bankRate = bankRates[index];
        const realBankRate = realBankRates[index];
        console.log(`利率${bankRate} \n`);
    
        for (let currentYearIndex = 0; currentYearIndex < yearNumbers.length; currentYearIndex++) {
            const yearNumber = yearNumbers[currentYearIndex];
            console.log(`  ${yearNumber}年期 \n`);
    
            for (let currentMoneyIndex = 0; currentMoneyIndex < moneys.length; currentMoneyIndex++) {
                // 当前金额
                const money = moneys[currentMoneyIndex];
                // 所有利息金额
                const allInterestMoney = money * bankRate * yearNumber / 100;
                // 所有人日
                const dayAllNumber = yearNumber * yearDay + 1;
    
                let dayNumber = yearNumber * yearDay;
    
                console.log('============================');
                
                console.log(`利率${bankRate}  ${yearNumber}年期 当前金额 ${money} \n`);
        
                const useBankRate = hasDiff ? realBankRate : bankRate;
                dayInterestMoney(useBankRate, money, hasDiff);

                if (customDay > 0) {
                    interestResult(useBankRate, money, customDay, dayAllNumber, allInterestMoney, useBankRate - bankRate, hasDiff);
                } else {
                    // 输出多个日期的利率
                    while (dayNumber > 700) {
                        dayNumber -= diffDay;
                        const hundredsNumber = dayNumber/100;
                        if (isInt(hundredsNumber)) {
                            dayNumber = hundredsNumber * 100;
                        } else {
                            dayNumber = Math.floor(hundredsNumber) * 100 + diffDay;
                        }
                        interestResult(useBankRate, money, dayNumber, dayAllNumber, allInterestMoney, useBankRate - bankRate, hasDiff);
                    }
                }
            }
        }
    }
}

// 正常利率
function interestNormal() {
    interestDiff(false)
}

// 输出每天利息
function dayInterestMoney(bankRate, money, hasDiff) {
    if (hasDiff) {
        console.log('真实利率：', bankRate.toFixed(2));
    }
    const dayInterestMoney = money * bankRate / 100 / yearDay;
    console.log('每天利息钱：', dayInterestMoney.toFixed(2));
}

// 利息结果
function interestResult(bankRate, money, dayNumber, dayAllNumber, allInterestMoney, diffBankRate, hasDiff) {
   
    console.log('所有利息钱：', allInterestMoney.toFixed(2));

    const dayInterestMoney = money * bankRate / 100 / yearDay;
     // 满额转让价格（正常利率的利息）
     const interestMoney = (dayAllNumber - dayNumber) * dayInterestMoney;
     // 转让价格
     const transferPrice = money + interestMoney;
     // 预期年化收益率 = （预计税后本息合计-转让价格）/ 转让价格*365/ 剩余存期(天)*100%
     const currentRate = (allInterestMoney - interestMoney)/ transferPrice * yearDay / dayNumber * 100;
     console.log('满额利息钱：', interestMoney.toFixed(2));
     console.log(`当前满额利息 ${(currentRate).toFixed(4)}%  购买金额 ${(transferPrice).toFixed(2)} 时间 ${dayNumber}`);
}

// 计算利率
interestDiff(hasDiff);
// jianhang每天利差0.002774 ~ 0.002783

function isInt(number) {
    return typeof number === 'number' && number % 1 === 0;
}