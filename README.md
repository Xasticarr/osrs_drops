# osrs_drops

OSRS Drop Roller

12/8/25: I have finally fleshed everything out for the project.
Generic drops:
Generic drops rolls a small static table with generic chances. Eventually I could update this to something else, but it was essentially made just to test the concept.

Boss drops:
Boss drops took a good chunk of time and was set up to introduce the concept of rolling specific tables for specific entities. I started with Zulrah because its an iconic OSRS boss. I added 2 other bosses I liked so there would be more than one, and so there would be other properties to test. Muspah for instance drops uniques as exclusive items so when you receive one you get nothing else. This could pave the way to add wilderness bosses in the future. The Rare Drop Table (accessible by basically every boss) kept breaking everything and was ultimately a huge pain to work with the entire time, but country girls make do. Overall, everything seems to be working and I have room to add other bosses in the future.

Raid drops:
This actually took way less time than I thought. Each raid has its own specific dorp functions, and needed their own integrations into the project as a whole. I worked through them one at a time and since they were all independent of each other, fixing one didn't break the others. They are all functioning properly at this time, and maybe I could add some further customization (Like rolling random points values for ToA) but for now everything is fine.

Inventory:
The inventory seems to be working and classifying everything into groups properly as it should. I might eventually adjust the collection log to be in a scrollable modal, but for now its fine. It just gets big the more items are added to it, but it categorizes nicely.

Overall:
I spent the first few months just making this whole thing work. As time went on I had some friends review my code and we decided we could clean it up to look a little nicer. Originally this whole project was set up in one file per roller. After getting some advice I decided to move forward with "decoupling" everything. This led to creating classes for individual things like (Raid, Item, DropTable, Boss, etc) and overall ended up being a lot cleaner I think, but I had some new hurdles to overcome because of scope and my lack of familiarity.

Overall I'm happy with how the project turned out, but I would consider adding more in the future!

INITIAL README:

This is a project I've been thinking about making for some time, so I finally decided to just start it and see where it goes.

My thought is to create a small application that will simulate rolling drops from the game "Old School Runescape".

My initial idea is to make something along the lines of a function tied to a button that will randomly roll a potential item from a pre-made drop table.

I have been thinking about having drops stored in an array and then tying those items to values which can then be rolled for with a randomizer.

I will try and update this file as I have more ideas, or as I flesh things out.
