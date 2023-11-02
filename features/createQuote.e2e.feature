Feature: User can create Quote with choosen products

    Scenario: As a: User
              I am able to: create an Opportunity

        Given I am logged to Salesforce
        And I am on Contact object
        When I create new Opportunity
        Then Opportunity is successfully created
        And all Opportunity credentials in details are correct

    Scenario: As a: User
              I am able to: create a Quote from Opportunity

        Given I am on Opportunity
        When I create new Quote
        And set Price Book Id for Quote on Opportunity
        Then new Quote is visible on related list
        And all credentials in Quote's details tab are correct

    Scenario: As a: User 
              I am able to: add products to Quote
        
        Given I am logged to Salesforce
        And I am on a Quote
        When I add Products to Quote
        Then all products are visible in Quote Lines related list
        

