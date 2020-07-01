using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using UnityEditor;
using UnityEngine;
using UnityEngine.AI;
using UnityEngine.SceneManagement;

public class MyEditor : EditorWindow
{
    [MenuItem("Tools/Export NavMesh Data")]
    static void AddWindow()
    {
        //Rect wr = new Rect(0, 0, 500, 200);
        //MyEditor windows = (MyEditor)EditorWindow.GetWindowWithRect(typeof(MyEditor), wr, true, "window name");
        //windows.Show();
        GetWindow(typeof(MyEditor));
    }

    string path;
    void Awake()
    {
        path = PlayerPrefs.GetString("ExportNavMeshDataPath");
    }
    void OnGUI()
    {
     
        EditorGUILayout.LabelField("导出路径:" + path);
		   EditorGUILayout.BeginHorizontal();
        if (GUILayout.Button("浏览"))
        {
            path = OpenPath();
            PlayerPrefs.SetString("ExportNavMeshDataPath", path);
        }
        
        if (GUILayout.Button("导出"))
        {
            Export();
        }
		EditorGUILayout.EndHorizontal();
    }

    void Export()
    {
        if (path == "")
        {
            Debug.Log("没有设置导出路径！");
            return;
        }

        Debug.Log("NavMesh Export Start");
        NavMeshTriangulation navMeshTriangulation = NavMesh.CalculateTriangulation();


        //文件路径
        //string path = Application.dataPath + "/ExportNavMesh/" + SceneManager.GetActiveScene().name + ".obj";
        string objPath = path + "/" + SceneManager.GetActiveScene().name + ".obj";

        //新建文件
        StreamWriter streamWriter = new StreamWriter(objPath);

        //顶点  
        for (int i = 0; i < navMeshTriangulation.vertices.Length; i++)
        {
            streamWriter.WriteLine("v  " + (-1 * navMeshTriangulation.vertices[i].x) + " " + navMeshTriangulation.vertices[i].y + " " + navMeshTriangulation.vertices[i].z);
        }

        streamWriter.WriteLine("g pPlane1");

        //索引  
        for (int i = 0; i < navMeshTriangulation.indices.Length;)
        {
            streamWriter.WriteLine("f " + (navMeshTriangulation.indices[i] + 1) + " " + (navMeshTriangulation.indices[i + 1] + 2) + " " + (navMeshTriangulation.indices[i + 1] + 1));
            i = i + 3;
        }

        streamWriter.Flush();
        streamWriter.Close();


        AssetDatabase.Refresh();

        Debug.Log("NavMesh Export Success");
    }

    private string OpenPath()
    {
        OpenDialogDir ofn2 = new OpenDialogDir();
        ofn2.pszDisplayName = new string(new char[2000]); ;     // 存放目录路径缓冲区  
        ofn2.lpszTitle = "导出路径";// 标题  
                                //ofn2.ulFlags = BIF_NEWDIALOGSTYLE | BIF_EDITBOX; // 新的样式,带编辑框  
        IntPtr pidlPtr = DllOpenFileDialog.SHBrowseForFolder(ofn2);

        char[] charArray = new char[2000];
        for (int i = 0; i < 2000; i++)
            charArray[i] = '\0';

        DllOpenFileDialog.SHGetPathFromIDList(pidlPtr, charArray);
        string path = new String(charArray);
        return path;
    }
}

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]

public class OpenDialogFile
{
    public int structSize = 0;
    public IntPtr dlgOwner = IntPtr.Zero;
    public IntPtr instance = IntPtr.Zero;
    public String filter = null;
    public String customFilter = null;
    public int maxCustFilter = 0;
    public int filterIndex = 0;
    public String file = null;
    public int maxFile = 0;
    public String fileTitle = null;
    public int maxFileTitle = 0;
    public String initialDir = null;
    public String title = null;
    public int flags = 0;
    public short fileOffset = 0;
    public short fileExtension = 0;
    public String defExt = null;
    public IntPtr custData = IntPtr.Zero;
    public IntPtr hook = IntPtr.Zero;
    public String templateName = null;
    public IntPtr reservedPtr = IntPtr.Zero;
    public int reservedInt = 0;
    public int flagsEx = 0;
}
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
public class OpenDialogDir
{
    public IntPtr hwndOwner = IntPtr.Zero;
    public IntPtr pidlRoot = IntPtr.Zero;
    public String pszDisplayName = null;
    public String lpszTitle = null;
    public UInt32 ulFlags = 0;
    public IntPtr lpfn = IntPtr.Zero;
    public IntPtr lParam = IntPtr.Zero;
    public int iImage = 0;
}

public class DllOpenFileDialog
{
    [DllImport("Comdlg32.dll", SetLastError = true, ThrowOnUnmappableChar = true, CharSet = CharSet.Auto)]
    public static extern bool GetOpenFileName([In, Out] OpenDialogFile ofn);

    [DllImport("Comdlg32.dll", SetLastError = true, ThrowOnUnmappableChar = true, CharSet = CharSet.Auto)]
    public static extern bool GetSaveFileName([In, Out] OpenDialogFile ofn);

    [DllImport("shell32.dll", SetLastError = true, ThrowOnUnmappableChar = true, CharSet = CharSet.Auto)]
    public static extern IntPtr SHBrowseForFolder([In, Out] OpenDialogDir ofn);

    [DllImport("shell32.dll", SetLastError = true, ThrowOnUnmappableChar = true, CharSet = CharSet.Auto)]
    public static extern bool SHGetPathFromIDList([In] IntPtr pidl, [In, Out] char[] fileName);


}