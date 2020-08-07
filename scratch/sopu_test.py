from bs4 import BeautifulSoup

shitty_markup = '<div class="bottom-message"><a href="learn_chinese.php"><strong>Learn Chinese</strong></a>: How are you? = N� h�o ma?<br><a href="/lotto_numbers.php"><strong>Lucky numbers (Lotto)</strong></a>: 04-05-17-24-44-29<br><a href="/pick3_numbers.php"><strong>Daily numbers (Pick3)</strong></a>: 129</div>'

soup = BeautifulSoup(shitty_markup)
bottom = soup.find_all("div", class_="bottom-message")
next_child_is_the_one = False
lucky_numbers_text = ""
for child in bottom[0].children:
  if next_child_is_the_one:
    lucky_numbers_text = child.string[2:]
    break

  if hasattr(child, "href") and child.get("href") == "/lotto_numbers.php":
    next_child_is_the_one = True


print(lucky_numbers_text)
