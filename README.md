# Balto-Test
## [See short video presentation here!](https://drive.google.com/file/d/1fjc6clHkOm80tfruoUem77PxAz4k13pO/view?usp=sharing)
## Description 
Create a full stack application with full CRUD capabality that uses React on the front end, a Python framework on the backend, and a relational database.

## Technologies Used
* React
* Django REST
* PostgreSQL

## Quick Overview
When building the backend, I chose to structure my model as close as possible to the source data provided in the `.csv` file to make the importing of data as smooth as possible. 
```python
class Movie(models.Model):
    year = models.IntegerField()
    title = models.TextField(null=True, blank=True)
    origin = models.TextField(null=True, blank=True)
    director = models.TextField(null=True, blank=True)
    cast = models.TextField(null=True, blank=True)
    genre = models.TextField(null=True, blank=True)
    wikipage = models.TextField(null=True, blank=True)
    plot = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title
 ```
 
 Note: Django REST provides for full CRUD capability out of the box once your models, views, and urls are constructed. So, the site does have full CRUD features through the Django site.

## Challenges
### Ingesting Data
As part of the task, I received a `.csv` file with thousands of rows of data on movies. A sample row looked like this:

```js
{"Year":"1901","Title":"The Martyred Presidents","Origin":"American","Director":"Unknown","Cast":"","Genre":"unknown","Wiki Page":"https://en.wikipedia.org/wiki/The_Martyred_Presidents","Plot":"The film, just over a minute long, is composed of two shots. In the first, a girl sits at the base of an altar or tomb, her face hidden from the camera. At the center of the altar, a viewing portal displays the portraits of three U.S. Presidents—Abraham Lincoln, James A. Garfield, and William McKinley—each victims of assassination.\r\nIn the second shot, which runs just over eight seconds long, an assassin kneels feet of Lady Justice."},
```
The main challenge here was importing the data into my postgreSQL database. 
#### Approach 1:
My first approach focused on directly importing the data from `.csv` into the database table. After researching on stackoverflow.com and other blog posts, I implemented the following solution.
```
//Connect to postgreSQL sever
Arjuns-MacBook-Air:movies_django arjunrawal$ psql  
//Connect to database
arjunrawal=# \c movieplots 
//Import `.csv` data into database
movieplots=# COPY movies_movie(year, title, origin, director, cast, genre, wikipage, plot) FROM ‘/Users/arjunrawal/Movie-Plots/movie_plots.csv’ WITH DELIMITER ‘,’ CSV HEADER;
```
But, I kept getting the following error message. I also tried using the `\copy` `psql` meta command from earlier versions of PostgreSQL, which invokes COPY FROM STDIN or COPY TO STDOUT, and then fetches/stores the data in a file accessible to the psql client, but to no avail.
```
ERROR: syntax error at or near “cast”
LINE 1: COPY movies_movie(year, title, origin, director, cast, genre...
```
After checking for unexpected content, special characters, spacing, or other syntactical issues, I was unable to identify the true source of this error. So, I adapted.

#### Approach 2:
My second approach to solving this issue was converting the `.csv` to `.json`. I've worked with JSON objects multiple times in the past, and after some cursory researching online, it seemed like a viable and easy-to-implement solution.
My implementation was somewhat similar to my first approach, but with one major difference. Conceptually, I would drop the contents of the `.json` file into a temporary table, then take the data from the temporary table and copy it into the table where I want to ultimately store the data.

1. Convert `.csv` to `.json` using npm's converter [linked here](https://www.npmjs.com/package/convert-csv-to-json)
2. Drop JSON data into a temporary table
```
CREATE TEMP TABLE stored_movies (info json);
\set content `cat /Users/arjunrawal/Balto-Test/movies_django/frontend/converted.json`
INSERT INTO stored_movies VALUES(:'content');
```
However, when I reached step 2, the program threw an error noting "unexpected content" (e.g. a comma after a '}' to separate the objects) at various locations, or the letter 'E' on the first line of the file where there was actually no letter 'E')

## Lessons Learned
1. Large datafiles can be unwieldy to work with, so best to start out with a small sample before scaling up.
2. (More of a reminder) SQL can be a very particular query language and it's important to consider the various constraints, conditions, or rules SQL uses to interpret data.
3. I thrive in teams! While I enjoyed working on this project independently, I see the added benefits of collaborating on this with a team or partner for my learning and growth. 

## Explorations and Continuations
As I continue to think about and work on this project, I'd like to take some more time to explore the following:
* Using pgAdmin4 as a management tool to easily import the `.csv` data. I came acrosss this widely used tool in my research, and it seems like it would make the importing process much more seamless. A colleague also recommended using it, but I ran into installation issues that I would need to dedicate more time to resolve.
* Gatsby - I'd like to explore the React-based templates on Gatsby. It would be a quick and light way to spin up a front end for this application, load the movieplots data, and then re-style and re-format a bit.


## Other Resources Used
- [DJANGO Rest Documentation on Serializers](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)
- [PostgreSQL Documentation on COPY](https://www.postgresql.org/docs/current/sql-copy.html)
- [Import a CSV file into a table using COPY statement](https://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/)
- [Using COPY in Postgres for Importing Large CSVs](https://www.trineo.com/blog/2018/08/using-copy-in-postgres-for-importing-large-csvs)
