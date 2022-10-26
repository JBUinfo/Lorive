package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// Definitions
var folders []string = make([]string, 0)
var files []string = make([]string, 0)

const root_path = "./ROOT_LORIVE"
const (
	FOLDER_ALREADY_EXISTS = iota
	SUCCESS_CREATING_FOLDER
)

type Folder struct {
	Name string `form:"name" json:"name" binding:"required"`
}

func createFolder(path string) uint32 {
	_, err := os.Stat(path)
	errors.Is(err, os.ErrNotExist)
	if err != nil {
		err := os.Mkdir(path, 0755)
		if err != nil {
			fmt.Printf("Error creating folder %v\n", err)
			return FOLDER_ALREADY_EXISTS
		}
		return SUCCESS_CREATING_FOLDER
	}
	return FOLDER_ALREADY_EXISTS
}

// API
func saveFileHandler(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	file, err := c.FormFile("upload")

	// The file cannot be received.
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"code":    500,
			"message": "No file is received",
		})
		return
	}

	// The file is received, so let's save it
	if err := c.SaveUploadedFile(file, root_path+"/"+file.Filename); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Unable to save the file",
		})
		return
	}

	// File saved successfully. Return proper result
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
	})
}

func createUserFolder(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Content-Type", "application/json")
	newPath := c.PostForm("path")
	rtn := createFolder(root_path + "/" + newPath)
	if SUCCESS_CREATING_FOLDER == rtn {
		c.JSON(http.StatusOK, gin.H{
			"code": 200,
		})
	} else if FOLDER_ALREADY_EXISTS == rtn {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Folder already exists.",
		})
	} else {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Error creating your folder.",
		})
	}
}

func getFiles(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Content-Type", "application/json")
	newPath := c.PostForm("path")
	folders = make([]string, 0)
	files = make([]string, 0)
	//dir := filepath.Dir(p) // para get el path
	something := gin.H{"path": newPath, "folders": folders, "files": files}
	_files, err := os.ReadDir(root_path + "/" + newPath)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"data": something, "code": 500})
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Error getting files",
		})
		fmt.Printf("Error in Walk %v\n", err)
	}
	for _, file := range _files {
		if file.IsDir() {
			folders = append(folders, file.Name())
		} else {
			//extension := filepath.Ext("/tmp/hello.go") // get extension
			files = append(files, file.Name())
		}
	}
	something = gin.H{"path": newPath, "folders": folders, "files": files}
	c.JSON(http.StatusOK, gin.H{"data": something, "code": 200})
}

func deleteFiles(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Content-Type", "application/json")
	newPath := c.PostForm("path")
	if err := os.RemoveAll(root_path + "/" + newPath); err == nil {
		c.JSON(http.StatusOK, gin.H{"code": 200})
	} else {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"code": 404, "message": "Error deleting"})
		fmt.Printf("Error in deleteFiles %v\n", err)
	}
}

func downloadFile(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Content-Type", "application/json")
	newPath := c.PostForm("path")
	c.File(root_path + "/" + newPath)
}

func renameItem(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Content-Type", "application/json")
	oldPath := c.PostForm("old")
	newPath := c.PostForm("new")
	e := os.Rename(root_path+"/"+oldPath, root_path+"/"+newPath)
	if e == nil {
		c.JSON(http.StatusOK, gin.H{"code": 200})
	} else {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"code": 404, "message": "Error renaming"})
		fmt.Printf("Error in renameItem %v\n", e)
	}
}

func main() {
	rtn := createFolder(root_path + "/")
	if SUCCESS_CREATING_FOLDER == rtn {
		fmt.Printf("Root folder created\n")
	} else if FOLDER_ALREADY_EXISTS == rtn {
		fmt.Printf("Root folder already exists\n")
	}

	router := gin.Default()
	router.POST("/get-items", getFiles)
	router.POST("/delete-item", deleteFiles)
	router.POST("/create-folder", createUserFolder)
	router.POST("/download", downloadFile)
	router.POST("/rename-item", renameItem)
	router.POST("/save-file", saveFileHandler)

	router.Run("localhost:8080")
}
