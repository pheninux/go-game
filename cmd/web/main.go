package main

import (
	"database/sql"
	"flag"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/pheninux/go-game/pkg/models/mysql"
	"html/template"
	"log"
	"net/http"
	"os"
)

// Define an application struct to hold the application-wide dependencies for the
// web application. For now we'll only include fields for the two custom loggers, but
// we'll add more to it as the build progresses.

type application struct {
	errorLog      *log.Logger
	infoLog       *log.Logger
	dbModel       *mysql.DataModel
	templateCache map[string]*template.Template
}

type config struct {
	addr      string
	staticDir string
}

func main() {

	fi, err := os.OpenFile("./cmd/web/temp/info.log", os.O_APPEND|os.O_RDWR|os.O_CREATE, 0666)
	fe, err := os.OpenFile("./cmd/web/temp/error.log", os.O_APPEND|os.O_RDWR|os.O_CREATE, 0666)

	if err != nil {
		log.Fatal(err)
	}
	defer fi.Close()
	defer fe.Close()
	// Use log.New() to create a logger for writing information messages. This takes
	// three parameters: the destination to write the logs to (os.Stdout), a string
	// prefix for message (INFO followed by a tab), and flags to indicate what
	// additional information to include (local date and time). Note that the flags
	// are joined using the bitwise OR operator |.
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	//infoLog = log.New(fi, "INFO\t", log.Ldate|log.Ltime)

	// Create a logger for writing error messages in the same way, but use stderr as
	// the destination and use the log.Lshortfile flag to include the relevant
	// file name and line number.
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Llongfile)
	//errorLog = log.New(fe, "ERROR\t", log.Ldate|log.Ltime|log.Llongfile)

	cfg := new(config)
	// Define a new command-line flag with the name 'addr', a default value of ":4000"
	// and some short help text explaining what the flag controls. The value of the
	// flag will be stored in the addr variable at runtime.
	//addr := flag.String("addr", ":4000", "HTTP network address")
	flag.StringVar(&cfg.addr, "addr", ":4000", "HTTP network address")
	flag.StringVar(&cfg.staticDir, "static-dir", "./ui/static/", "HTTP network address")
	// Define a new command-line flag for the MySQL DSN string.
	dsn := flag.String("dsn", "root:Sherine2011$@tcp(localhost:3306)/go_game?parseTime=true", "MySQL data source name")
	// Importantly, we use the flag.Parse() function to parse the command-line flag.
	// This reads in the command-line flag value and assigns it to the addr
	// variable. You need to call this *before* you use the addr variable
	// otherwise it will always contain the default value of ":4000". If any errors are
	// encountered during parsing the application will be terminated.
	flag.Parse()

	// To keep the main() function tidy I've put the code for creating a connection
	// pool into the separate openDB() function below. We pass openDB() the DSN
	// from the command-line flag.
	db, err := openGormDB(*dsn)
	if err != nil {
		errorLog.Fatal(err)
	}

	//We also defer a call to db.Close(), so that the connection pool is closed
	// before the main() function exits.
	defer db.Close()

	if err != nil {
		errorLog.Fatal(err)
	}
	// Initialize a new instance of application containing the dependencies.
	app := &application{
		infoLog:  infoLog,
		errorLog: errorLog,
		dbModel:  &mysql.DataModel{db},
	}

	srv := &http.Server{
		Addr:     cfg.addr,
		Handler:  app.routes(),
		ErrorLog: errorLog,
	}

	app.infoLog.Printf("Starting server on %v ", cfg.addr)
	err = srv.ListenAndServe()
	app.errorLog.Fatal(err)

}

// for a given DSN.
func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}

func openGormDB(dsn string) (*gorm.DB, error) {

	db, err := gorm.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil

}
