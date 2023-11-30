Feature: User is able to create and edit Accounts and Contact

  Scenario: As a: user
            I can: log into the Trailhead playgroud 

    Given I am on the login page
    When I login with username 
    Then title of page is equal "Home | Salesforce"
    And "Setup" application is visible

  Scenario: When logged in
            I can: edit Account from All Accounts list view in Sales application

    Given I am in Sales application
    And I am on Accounts page
    When I edit Account
    Then Success edit Account message is displayed
    And Account changes are visible in Details Tab

  Scenario: When logged in
            I can: create Contact on Account

    Given I am in related tab
    When I create Contact
    Then Success create Contact message is displayed
    And Contact details are visible in Details Tab
    And Contact named "auto test" can be found by Gloabl Search
 
  Scenario: As Uaser
            I can: log out
    
    Given I am on the home page
    When I log out 
    Then login page is displayed
