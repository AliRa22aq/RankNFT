var RankNFT = artifacts.require("RankNFT.sol");
const moment = require('moment');


contract("RankNFTContract", (accounts) => {
  
  let rankNFTInstance;

  it("Admin can check and change the prices of all packages ", async () =>  {
    const owner = accounts[0];

    rankNFTInstance = await RankNFT.deployed()

    const price_of_one_day_subscription = await rankNFTInstance.get_cost_of_subscription(1);
    assert.equal(price_of_one_day_subscription, web3.utils.toWei('0.02', 'ether'), "Price is not 0.02 eths");
    
    const price_of_seven_days_subscription = await rankNFTInstance.get_cost_of_subscription(7);
    assert.equal(price_of_seven_days_subscription, web3.utils.toWei('0.06', 'ether'), "Price is not 0.06 eths");

    const price_of_one_month_subscription = await rankNFTInstance.get_cost_of_subscription(30);
    assert.equal(price_of_one_month_subscription, web3.utils.toWei('0.15', 'ether'), "Price is not 0.15 eths");

    const price_of_six_month_subscription = await rankNFTInstance.get_cost_of_subscription(180);
    assert.equal(price_of_six_month_subscription, web3.utils.toWei('0.7', 'ether'), "Price is not 0.7 eths");


    await rankNFTInstance.set_cost_of_subscription(1, web3.utils.toWei('0.03', 'ether') );
    const price_of_one_day_subscription_after = await rankNFTInstance.get_cost_of_subscription(1);
    assert.equal(price_of_one_day_subscription_after, web3.utils.toWei('0.03', 'ether'), "Price is not 0.03 eths");

    await rankNFTInstance.set_cost_of_subscription(7, web3.utils.toWei('0.07', 'ether') );
    const price_of_seven_days_subscription_after = await rankNFTInstance.get_cost_of_subscription(7);
    assert.equal(price_of_seven_days_subscription_after, web3.utils.toWei('0.07', 'ether'), "Price is not 0.07 eths");

    await rankNFTInstance.set_cost_of_subscription(30, web3.utils.toWei('0.2', 'ether') );
    const price_of_one_month_subscription_after = await rankNFTInstance.get_cost_of_subscription(30);
    assert.equal(price_of_one_month_subscription_after, web3.utils.toWei('0.2', 'ether'), "Price is not 0.2 eths");

    await rankNFTInstance.set_cost_of_subscription(180, web3.utils.toWei('0.8', 'ether') );
    const price_of_six_month_subscription_after = await rankNFTInstance.get_cost_of_subscription(180);
    assert.equal(price_of_six_month_subscription_after, web3.utils.toWei('0.8', 'ether'), "Price is not 0.7 eths");

  });


  it("Users can only buy subscription once they are whitelisted by admin ", async () =>  {
    const owner = accounts[0];
    const buyer1 = accounts[1];
    const buyer2 = accounts[2];
    const buyer3 = accounts[3];

    rankNFTInstance = await RankNFT.deployed()

    try{
        await rankNFTInstance.get_single_day_subscription({from: buyer1, value: web3.utils.toWei('0.03', 'ether') });
    } catch(error){
        assert.equal(error.reason, "Not whitelisting_period, Please contact to Admin", "Not a whitelisting Error");
    }

    
    await rankNFTInstance.whitelist_users([buyer1], 1);
    
    try{
        await rankNFTInstance.get_single_day_subscription({from: buyer1, value: web3.utils.toWei('0.02', 'ether') });
    } catch(error){
        assert.equal(error.reason, "not enough money sent", "User is whitelisted and enough money is sent");
    }


    const list1 = await rankNFTInstance.list_of_whitelisted_users();
    assert.equal(list1.includes(String(buyer1)), true, "buyer1 not present in list");

    await rankNFTInstance.whitelist_users([String(buyer2), String(buyer3)], 7);

    const list2 = await rankNFTInstance.list_of_whitelisted_users();
    assert.equal(list2.includes(String(buyer1)), true, "buyer1 not present in list");
    assert.equal(list2.includes(String(buyer2)), true, "buyer1 not present in list");
    assert.equal(list2.includes(String(buyer3)), true, "buyer1 not present in list");


    const buyer1_is_whiteListed = await rankNFTInstance.is_whitelisted(buyer1);
    assert.equal(buyer1_is_whiteListed, true, "buyer1 is whitelisted");

    const buyer2_is_whiteListed = await rankNFTInstance.is_whitelisted(buyer2);
    assert.equal(buyer2_is_whiteListed, true, "buyer2 is whitelisted");



    const buyer1_is_member = await rankNFTInstance.is_subscriber(buyer1);
    assert.equal(buyer1_is_member, false, "buyer1 is not a member yet");

    const buyer2_is_member = await rankNFTInstance.is_subscriber(buyer2);
    assert.equal(buyer2_is_member, false, "buyer2 is not a member yet");


    const buyer1_subscription = await rankNFTInstance.get_single_day_subscription({from: buyer1, value: web3.utils.toWei('0.03', 'ether') });
    assert.equal(buyer1_subscription.logs[0].event, "WhiteListed", "WhiteListed event is not emitted");
    assert.equal(buyer1_subscription.logs[1].event, "MembershipAssigned", "MembershipAssigned event is not emitted");
    assert.equal(buyer1_subscription.logs[2].event, "PaymentReleased", "PaymentReleased event is not emitted");


    const buyer2_subscription = await rankNFTInstance.get_seven_days_subscription({from: buyer1, value: web3.utils.toWei('0.07', 'ether') });
    assert.equal(buyer2_subscription.logs[0].event, "WhiteListed", "WhiteListed event is not emitted");
    assert.equal(buyer2_subscription.logs[1].event, "MembershipAssigned", "MembershipAssigned event is not emitted");
    assert.equal(buyer2_subscription.logs[2].event, "PaymentReleased", "PaymentReleased event is not emitted");

    const buyer3_subscription = await rankNFTInstance.get_one_month_subscription({from: buyer1, value: web3.utils.toWei('0.2', 'ether') });
    assert.equal(buyer3_subscription.logs[0].event, "WhiteListed", "WhiteListed event is not emitted");
    assert.equal(buyer3_subscription.logs[1].event, "MembershipAssigned", "MembershipAssigned event is not emitted");
    assert.equal(buyer3_subscription.logs[2].event, "PaymentReleased", "PaymentReleased event is not emitted");

    const buyer1_subscription_again = await rankNFTInstance.get_six_month_subscription({from: buyer1, value: web3.utils.toWei('0.8', 'ether') });
    assert.equal(buyer1_subscription_again.logs[0].event, "WhiteListed", "WhiteListed event is not emitted");
    assert.equal(buyer1_subscription_again.logs[1].event, "MembershipAssigned", "MembershipAssigned event is not emitted");
    assert.equal(buyer1_subscription_again.logs[2].event, "PaymentReleased", "PaymentReleased event is not emitted");

  });


  it("check if users are getting appropriate duration of whitelisting and subscriptions ", async () =>  {
    const owner = accounts[0];
    const buyer4 = accounts[4];
    const buyer5 = accounts[5];
    const buyer6 = accounts[6];
    const buyer7 = accounts[7];

    rankNFTInstance = await RankNFT.deployed()


    const buyer4_whitelisting_period_before = await rankNFTInstance.whitelisting_period(buyer4);
    assert.equal(buyer4_whitelisting_period_before, 0, "The whitelisting period of buyer4 is more than 0");

    const buyer5_whitelisting_period_before = await rankNFTInstance.whitelisting_period(buyer5);
    assert.equal(buyer5_whitelisting_period_before, 0, "The whitelisting period of buyer5 is more than 0");

    const buyer6_whitelisting_period_before = await rankNFTInstance.whitelisting_period(buyer6);
    assert.equal(buyer6_whitelisting_period_before, 0, "The whitelisting period of buyer6 is more than 0");

    await rankNFTInstance.whitelist_users([buyer4], 1);
    await rankNFTInstance.whitelist_users([buyer5], 5);
    await rankNFTInstance.whitelist_users([buyer6], 10);
    await rankNFTInstance.whitelist_users([buyer7], 30);

    const buyer4_whitelisting_period_after = await rankNFTInstance.whitelisting_period(buyer4);
    var buyer4_whitelisting_period = new moment.duration(Number(buyer4_whitelisting_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer4_whitelisting_period.asDays()), 1, "The whitelisting period of buyer4 is not 1 day");

    const buyer5_whitelisting_period_after = await rankNFTInstance.whitelisting_period(buyer5);
    var buyer5_whitelisting_period = new moment.duration(Number(buyer5_whitelisting_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer5_whitelisting_period.asDays()), 5, "The whitelisting period of buyer4 is not 5 days");

    const buyer6_whitelisting_period_after = await rankNFTInstance.whitelisting_period(buyer6);
    var buyer6_whitelisting_period = new moment.duration(Number(buyer6_whitelisting_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer6_whitelisting_period.asDays()), 10, "The whitelisting period of buyer4 is not 10 days");

    const buyer7_whitelisting_period_after = await rankNFTInstance.whitelisting_period(buyer7);
    var buyer7_whitelisting_period = new moment.duration(Number(buyer7_whitelisting_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer7_whitelisting_period.asDays()), 30, "The whitelisting period of buyer7 is not 30 days");

    

    const buyer4_membership_period_before = await rankNFTInstance.subscription_period(buyer4);
    assert.equal(buyer4_membership_period_before, 0, "The subscription period of buyer4 is more than 0");

    const buyer5_membership_period_before = await rankNFTInstance.subscription_period(buyer5);
    assert.equal(buyer5_membership_period_before, 0, "The subscription period of buyer5 is more than 0");

    const buyer6_membership_period_before = await rankNFTInstance.subscription_period(buyer6);
    assert.equal(buyer6_membership_period_before, 0, "The subscription period of buyer6 is more than 0");


    await rankNFTInstance.get_single_day_subscription({from: buyer4, value: web3.utils.toWei('0.03', 'ether') });
    await rankNFTInstance.get_seven_days_subscription({from: buyer5, value: web3.utils.toWei('0.07', 'ether') });
    await rankNFTInstance.get_one_month_subscription({from: buyer6, value: web3.utils.toWei('0.2', 'ether') });
    await rankNFTInstance.get_six_month_subscription({from: buyer7, value: web3.utils.toWei('0.8', 'ether') });



    const buyer4_membership_period_after = await rankNFTInstance.subscription_period(buyer4);
    var buyer4_membership_period = new moment.duration(Number(buyer4_membership_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer4_membership_period.asDays()), 1, "The subscription period of buyer4 is not 1 day");

    const buyer5_membership_period_after = await rankNFTInstance.subscription_period(buyer5);
    var buyer5_membership_period = new moment.duration(Number(buyer5_membership_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer5_membership_period.asDays()), 7, "The subscription period of buyer5 is not 7 days");

    const buyer6_membership_period_after = await rankNFTInstance.subscription_period(buyer6);
    var buyer6_membership_period = new moment.duration(Number(buyer6_membership_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer6_membership_period.asDays()), 30, "The subscription period of buyer6 is not 30 days");

    const buyer7_membership_period_after = await rankNFTInstance.subscription_period(buyer7);
    var buyer7_membership_period = new moment.duration(Number(buyer7_membership_period_after) * 1000 - Date.now());
    assert.equal(Math.round(buyer7_membership_period.asDays()), 180, "The subscription period of buyer7 is not 180 day");



    const buyer4_whitelisting_period_after_membership = await rankNFTInstance.whitelisting_period(buyer4);
    var buyer4_whitelisting_period_post_membership = new moment.duration(Number(buyer4_whitelisting_period_after_membership) * 1000 - Date.now());
    assert.equal(Math.round(buyer4_whitelisting_period_post_membership.asDays()), 2, "The whitelisting period of buyer4 is not 2 day");

    const buyer5_whitelisting_period_after_membership = await rankNFTInstance.whitelisting_period(buyer5);
    var buyer5_whitelisting_period_post_membership = new moment.duration(Number(buyer5_whitelisting_period_after_membership) * 1000 - Date.now());
    assert.equal(Math.round(buyer5_whitelisting_period_post_membership.asDays()), 12, "The whitelisting period of buyer4 is not 5 days");

    const buyer6_whitelisting_period_after_membership = await rankNFTInstance.whitelisting_period(buyer6);
    var buyer6_whitelisting_period_post_membership = new moment.duration(Number(buyer6_whitelisting_period_after_membership) * 1000 - Date.now());
    assert.equal(Math.round(buyer6_whitelisting_period_post_membership.asDays()), 40, "The whitelisting period of buyer4 is not 10 days");

    const buyer7_whitelisting_period_after_membership = await rankNFTInstance.whitelisting_period(buyer7);
    var buyer7_whitelisting_period_post_membership = new moment.duration(Number(buyer7_whitelisting_period_after_membership) * 1000 - Date.now());
    assert.equal(Math.round(buyer7_whitelisting_period_post_membership.asDays()), 210, "The whitelisting period of buyer7 is not 30 days");


    const list_of_whiteListed_Users = await rankNFTInstance.list_of_whitelisted_users();
    assert.equal(list_of_whiteListed_Users.includes(String(buyer4)), true, "buyer4 not present in list");
    assert.equal(list_of_whiteListed_Users.includes(String(buyer5)), true, "buyer5 not present in list");
    assert.equal(list_of_whiteListed_Users.includes(String(buyer6)), true, "buyer6 not present in list");
    assert.equal(list_of_whiteListed_Users.includes(String(buyer7)), true, "buyer7 not present in list");


    await rankNFTInstance.blacklist_users([buyer4, buyer5]);

    const buyer4_whitelisting_period_after_blacklistinge = await rankNFTInstance.whitelisting_period(buyer4);
    assert.equal(buyer4_whitelisting_period_after_blacklistinge, 0, "The whitelisting period of buyer4 is more than 0");

    const buyer5_whitelisting_period_after_blacklisting = await rankNFTInstance.whitelisting_period(buyer5);
    assert.equal(buyer5_whitelisting_period_after_blacklisting, 0, "The whitelisting period of buyer5 is more than 0");


    const buyer4_membership_period_after_blacklisting = await rankNFTInstance.subscription_period(buyer4);
    assert.equal(buyer4_membership_period_after_blacklisting, 0, "The subscription period of buyer4 is more than 0");

    const buyer5_membership_period_after_blacklisting = await rankNFTInstance.subscription_period(buyer5);
    assert.equal(buyer5_membership_period_after_blacklisting, 0, "The subscription period of buyer5 is more than 0");


    const list_of_whiteListed_Users_after_blacklisting = await rankNFTInstance.list_of_whitelisted_users();
    assert.equal(list_of_whiteListed_Users_after_blacklisting.includes(String(buyer4)), true, "buyer4 not present in list");
    assert.equal(list_of_whiteListed_Users_after_blacklisting.includes(String(buyer5)), true, "buyer5 not present in list");
    assert.equal(list_of_whiteListed_Users_after_blacklisting.includes(String(buyer6)), true, "buyer6 not present in list");
    assert.equal(list_of_whiteListed_Users_after_blacklisting.includes(String(buyer7)), true, "buyer7 not present in list");



    await rankNFTInstance.refresh_list_of_whitelisted_users();

    const list_of_whiteListed_Users_after_blacklisting_refreshed = await rankNFTInstance.list_of_whitelisted_users();
    assert.equal(list_of_whiteListed_Users_after_blacklisting_refreshed.includes(String(buyer4)), false, "buyer4 not present in list");
    assert.equal(list_of_whiteListed_Users_after_blacklisting_refreshed.includes(String(buyer5)), false, "buyer5 not present in list");
    assert.equal(list_of_whiteListed_Users_after_blacklisting_refreshed.includes(String(buyer6)), true, "buyer6 not present in list");
    assert.equal(list_of_whiteListed_Users_after_blacklisting_refreshed.includes(String(buyer7)), true, "buyer7 not present in list");

  });




  it("check if owner and developer will get their share as expected ", async () =>  {
    const owner = accounts[0];
    const developer = accounts[8];
    const buyer1 = accounts[1];
    const buyer2 = accounts[2];
    const buyer3 = accounts[3];
    const buyer4 = accounts[4];

    rankNFTInstance = await RankNFT.deployed()

    let total_income;
    let ownersShare;
    let developrsShare;

    await rankNFTInstance.whitelist_users([buyer1, buyer2, buyer3, buyer4], 1);


    await rankNFTInstance.set_cost_of_subscription(1, web3.utils.toWei('0.02', 'ether') );
    await rankNFTInstance.set_cost_of_subscription(7, web3.utils.toWei('0.06', 'ether') );
    await rankNFTInstance.set_cost_of_subscription(30, web3.utils.toWei('0.15', 'ether') );
    await rankNFTInstance.set_cost_of_subscription(180, web3.utils.toWei('0.7', 'ether') );
    
    const balance_of_owner_before_buyer1 = Number((await web3.eth.getBalance(owner)));
    const balance_of_developer_before_buyer1 = Number((await web3.eth.getBalance(developer)));
    

    await rankNFTInstance.get_single_day_subscription({from: buyer1, value: web3.utils.toWei('0.02', 'ether') });

    total_income = Number(await web3.utils.toWei('0.02', 'ether'));
    ownersShare =  total_income * (85 / 100);
    developrsShare =  total_income - ownersShare

    const balance_of_owner_after_buyer1 = Number((await web3.eth.getBalance(owner)));
    const balance_of_developer_after_buyer1 = Number((await web3.eth.getBalance(developer)));

    assert.equal(
        balance_of_owner_after_buyer1, 
        balance_of_owner_before_buyer1 + ownersShare, 
        "owner's share is not as expected"
    );

    assert.equal(
        balance_of_developer_after_buyer1, 
        balance_of_developer_before_buyer1 + developrsShare, 
        "developer's share is not as expected"
    );


    await rankNFTInstance.get_seven_days_subscription({from: buyer2, value: web3.utils.toWei('0.06', 'ether') });

    total_income = Number(await web3.utils.toWei('0.06', 'ether'));
    ownersShare =  total_income * (85 / 100);
    developrsShare =  total_income - ownersShare

    const balance_of_owner_after_buyer2 = Number((await web3.eth.getBalance(owner)));
    const balance_of_developer_after_buyer2 = Number((await web3.eth.getBalance(developer)));

    assert.equal(
        balance_of_owner_after_buyer2, 
        balance_of_owner_after_buyer1 + ownersShare, 
        "owner's share is not as expected"
    );

    assert.equal(
        balance_of_developer_after_buyer2, 
        balance_of_developer_after_buyer1 + developrsShare, 
        "developer's share is not as expected"
    );


    await rankNFTInstance.get_one_month_subscription({from: buyer3, value: web3.utils.toWei('0.15', 'ether') });

    total_income = Number(await web3.utils.toWei('0.15', 'ether'));
    ownersShare =  total_income * (85 / 100);
    developrsShare =  total_income - ownersShare

    const balance_of_owner_after_buyer3 = Number((await web3.eth.getBalance(owner)));
    const balance_of_developer_after_buyer3 = Number((await web3.eth.getBalance(developer)));

    assert.equal(
        balance_of_owner_after_buyer3, 
        balance_of_owner_after_buyer2 + ownersShare, 
        "owner's share is not as expected"
    );

    assert.equal(
        balance_of_developer_after_buyer3, 
        balance_of_developer_after_buyer2 + developrsShare, 
        "developer's share is not as expected"
    );



    await rankNFTInstance.get_six_month_subscription({from: buyer4, value: web3.utils.toWei('0.7', 'ether') });

    total_income = Number(await web3.utils.toWei('0.7', 'ether'));
    ownersShare =  total_income * (85 / 100);
    developrsShare =  total_income - ownersShare

    const balance_of_owner_after_buyer4 = Number((await web3.eth.getBalance(owner)));
    const balance_of_developer_after_buyer4 = Number((await web3.eth.getBalance(developer)));

    assert.equal(
        balance_of_owner_after_buyer4, 
        balance_of_owner_after_buyer3 + ownersShare, 
        "owner's share is not as expected"
    );

    assert.equal(
        balance_of_developer_after_buyer4, 
        balance_of_developer_after_buyer3 + developrsShare, 
        "developer's share is not as expected"
    );



  })

})