Feature: Login

  Scenario: Failed login

    Given I visit the home page
    When I enter the credentials vlad and cacamaca
        Then I get redirected to 'http://localhost:3000/login'


  Scenario: Successful login

    Given I visit the home page
    When I enter the credentials vlad_dohotaru and netop123
    Then I get redirected to 'http://localhost:3000/profile'
